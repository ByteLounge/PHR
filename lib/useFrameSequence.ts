"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseFrameSequenceOptions {
  totalFrames: number;
  getFramePath: (index: number) => string;
  keyframeStep?: number; // Spacing for initial fast-boot keyframes (default: 5)
  fastBootDenseCount?: number; // Dense cluster at start (default: 15)
  maxConcurrentBackground?: number; // Background download concurrency (default: 6)
}

export function useFrameSequence({
  totalFrames,
  getFramePath,
  keyframeStep = 5,
  fastBootDenseCount = 15,
  maxConcurrentBackground = 6,
}: UseFrameSequenceOptions) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const imagesRef = useRef<(HTMLImageElement | null)[]>(new Array(totalFrames + 1).fill(null));
  const loadedSetRef = useRef<Set<number>>(new Set());
  const loadingPromisesRef = useRef<Map<number, Promise<HTMLImageElement | null>>>(new Map());

  const [isReady, setIsReady] = useState(false);
  const [fastBootProgress, setFastBootProgress] = useState(0);
  const [totalLoadedCount, setTotalLoadedCount] = useState(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(1);

  const targetFrameRef = useRef<number>(1);
  const currentDrawnFrameRef = useRef<number>(1);
  const actualDrawnIndexRef = useRef<number>(1);
  const animFrameIdRef = useRef<number | null>(null);
  const isCancelledRef = useRef<boolean>(false);

  // Helper to load and decode a single frame off-thread
  const loadSingleFrame = useCallback(
    async (index: number): Promise<HTMLImageElement | null> => {
      if (imagesRef.current[index]) return imagesRef.current[index];
      if (loadingPromisesRef.current.has(index)) {
        return loadingPromisesRef.current.get(index)!;
      }

      const promise = (async () => {
        try {
          const img = new window.Image();
          img.src = getFramePath(index);

          // Use off-thread image decoding to prevent main-thread jank
          if (typeof img.decode === "function") {
            await img.decode();
          } else {
            await new Promise<void>((resolve, reject) => {
              (img as HTMLImageElement).onload = () => resolve();
              (img as HTMLImageElement).onerror = () => reject();
            });
          }

          if (!isCancelledRef.current) {
            imagesRef.current[index] = img;
            loadedSetRef.current.add(index);
            setTotalLoadedCount((prev) => prev + 1);
          }
          return img;
        } catch {
          return null;
        } finally {
          loadingPromisesRef.current.delete(index);
        }
      })();

      loadingPromisesRef.current.set(index, promise);
      return promise;
    },
    [getFramePath]
  );

  // Search outwards for nearest loaded frame (guaranteed to find keyframe nearby)
  const findNearestLoadedIndex = useCallback(
    (targetIdx: number): number | null => {
      const clamped = Math.max(1, Math.min(totalFrames, Math.round(targetIdx)));
      if (loadedSetRef.current.has(clamped) && imagesRef.current[clamped]) {
        return clamped;
      }

      for (let offset = 1; offset < totalFrames; offset++) {
        const left = clamped - offset;
        if (left >= 1 && loadedSetRef.current.has(left) && imagesRef.current[left]) {
          return left;
        }
        const right = clamped + offset;
        if (right <= totalFrames && loadedSetRef.current.has(right) && imagesRef.current[right]) {
          return right;
        }
      }
      return null;
    },
    [totalFrames]
  );

  // Draw frame to canvas with hardware acceleration
  const drawFrame = useCallback(
    (frameIdx: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d", {
        alpha: false,
        desynchronized: true,
      });
      if (!ctx) return;

      const clamped = Math.max(1, Math.min(totalFrames, Math.round(frameIdx)));
      const nearestIdx = findNearestLoadedIndex(clamped);
      if (nearestIdx === null) return;

      const img = imagesRef.current[nearestIdx];
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        actualDrawnIndexRef.current = nearestIdx;
        setCurrentFrameIndex(clamped);
      }
    },
    [findNearestLoadedIndex, totalFrames]
  );

  // Set target frame from scroll or autoplay
  const setTargetFrame = useCallback((frame: number) => {
    targetFrameRef.current = Math.max(1, Math.min(totalFrames, frame));
  }, [totalFrames]);

  // Main Fast-Boot Preload & Background Stream Loop
  useEffect(() => {
    isCancelledRef.current = false;

    // 1. Build Fast-Boot Indices
    const fastBootIndicesSet = new Set<number>();
    // Dense start cluster
    for (let i = 1; i <= Math.min(fastBootDenseCount, totalFrames); i++) {
      fastBootIndicesSet.add(i);
    }
    // Keyframes grid across entire sequence
    for (let i = 1; i <= totalFrames; i += keyframeStep) {
      fastBootIndicesSet.add(i);
    }
    fastBootIndicesSet.add(totalFrames); // Ensure last frame is included

    const fastBootIndices = Array.from(fastBootIndicesSet).sort((a, b) => a - b);
    const totalFastBoot = fastBootIndices.length;
    let fastBootLoaded = 0;

    // Load fast boot set with high concurrency
    const fastBootBatchSize = 10;
    let fastBootIdx = 0;

    const loadFastBootBatch = async () => {
      while (fastBootIdx < fastBootIndices.length && !isCancelledRef.current) {
        const batch = fastBootIndices.slice(fastBootIdx, fastBootIdx + fastBootBatchSize);
        fastBootIdx += fastBootBatchSize;

        await Promise.all(
          batch.map(async (idx) => {
            await loadSingleFrame(idx);
            if (!isCancelledRef.current) {
              fastBootLoaded++;
              setFastBootProgress(Math.round((fastBootLoaded / totalFastBoot) * 100));
              // Initial render as soon as frame 1 is ready
              if (idx === 1 && canvasRef.current) {
                drawFrame(1);
              }
            }
          })
        );
      }

      if (!isCancelledRef.current) {
        setIsReady(true);
        // Start dynamic background stream
        startDynamicBackgroundLoader();
      }
    };

    // 2. Dynamic Scroll-Prioritized Background Loader
    const startDynamicBackgroundLoader = () => {
      let activeWorkers = 0;

      const getNextPriorityIndex = (): number | null => {
        const currentTarget = Math.round(targetFrameRef.current);
        let bestIndex: number | null = null;
        let minDistance = Infinity;

        for (let i = 1; i <= totalFrames; i++) {
          if (!loadedSetRef.current.has(i) && !loadingPromisesRef.current.has(i)) {
            const distance = Math.abs(i - currentTarget);
            if (distance < minDistance) {
              minDistance = distance;
              bestIndex = i;
            }
          }
        }
        return bestIndex;
      };

      const worker = async () => {
        if (isCancelledRef.current) return;
        const nextIdx = getNextPriorityIndex();
        if (nextIdx === null) return; // All frames loaded

        activeWorkers++;
        await loadSingleFrame(nextIdx);
        activeWorkers--;

        // If target frame is close to this newly loaded frame, redraw immediately
        if (!isCancelledRef.current) {
          const currentTarget = Math.round(targetFrameRef.current);
          if (Math.abs(currentTarget - nextIdx) <= 2) {
            drawFrame(targetFrameRef.current);
          }

          // Launch next task
          if (activeWorkers < maxConcurrentBackground && !isCancelledRef.current) {
            worker();
          }
        }
      };

      // Spawn worker pool
      for (let w = 0; w < maxConcurrentBackground; w++) {
        worker();
      }
    };

    loadFastBootBatch();

    return () => {
      isCancelledRef.current = true;
    };
  }, [
    totalFrames,
    keyframeStep,
    fastBootDenseCount,
    maxConcurrentBackground,
    loadSingleFrame,
    drawFrame,
  ]);

  // Smooth 60fps Lerp Animation Loop
  useEffect(() => {
    const renderLoop = () => {
      const target = targetFrameRef.current;
      const current = currentDrawnFrameRef.current;
      const diff = target - current;

      if (Math.abs(diff) > 0.01) {
        const next = current + diff * 0.28;
        currentDrawnFrameRef.current = next;
        drawFrame(next);
      } else {
        // When settled, check if a higher-quality exact frame is now ready
        const roundedTarget = Math.round(target);
        if (
          actualDrawnIndexRef.current !== roundedTarget &&
          loadedSetRef.current.has(roundedTarget)
        ) {
          drawFrame(target);
        }
      }

      animFrameIdRef.current = requestAnimationFrame(renderLoop);
    };

    animFrameIdRef.current = requestAnimationFrame(renderLoop);
    return () => {
      if (animFrameIdRef.current) cancelAnimationFrame(animFrameIdRef.current);
    };
  }, [drawFrame]);

  // Canvas dimension init
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = 1280;
    canvas.height = 720;
    if (imagesRef.current[1]) {
      drawFrame(1);
    }
  }, [drawFrame, isReady]);

  return {
    canvasRef,
    isReady,
    fastBootProgress,
    totalLoadedCount,
    currentFrameIndex,
    setTargetFrame,
    drawFrame,
  };
}
