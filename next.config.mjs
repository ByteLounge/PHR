import fs from 'fs';

// Patch Node 24 Windows bug where readlink on non-symlink throws EISDIR instead of EINVAL
if (fs.readlinkSync) {
  const origReadlinkSync = fs.readlinkSync;
  fs.readlinkSync = function (path, options) {
    try {
      return origReadlinkSync.call(fs, path, options);
    } catch (err) {
      if (err && (err.code === 'EISDIR' || err.code === 'EINVAL')) {
        err.code = 'EINVAL';
      }
      throw err;
    }
  };
}

if (fs.readlink) {
  const origReadlink = fs.readlink;
  fs.readlink = function (path, options, callback) {
    if (typeof options === 'function') {
      callback = options;
      options = {};
    }
    return origReadlink.call(fs, path, options, (err, linkString) => {
      if (err && (err.code === 'EISDIR' || err.code === 'EINVAL')) {
        err.code = 'EINVAL';
      }
      if (callback) callback(err, linkString);
    });
  };
}

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
