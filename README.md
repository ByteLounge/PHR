# 🖋️ P.H. Rajput & Sons — Modern Digital Stationery Flagship

> **Official Digital Showcase & E-Commerce Catalog for P.H. Rajput & Sons (Est. Stationery & Co., Shop No. 178, Mapusa Municipal Market, Mapusa-Goa).**

An Awwwards-caliber, Apple & Sony-inspired **3D scroll-driven product experience** built with **Next.js 15 (App Router)**, **React 19**, **Tailwind CSS**, and **Framer Motion**.

---

## ✨ Features

- **Parker IM Premium 3D Scrollytelling (Home Dashboard)**:
  - Scroll-driven 300-frame sequential canvas engine.
  - Exploded mechanical anatomy revealing the click button, brass chassis, Quinkflow ink refill, and tungsten carbide tip with interactive component inspection pins.
- **Classmate Asteroid Compass Box 3D Showcase (`/geometry`)**:
  - 300-frame exploded view opening the protective tin, separating the molded organizer tray, and revealing all 10 geometry instruments.
  - Interactive deep-dive modal for every individual instrument (*Spur-Gear Compass, Divider, Beveled Scale, Set Squares, Protractor, Dust-Free Eraser, Sharpener, Pencil*).
- **Apple & Sony Minimalist Aesthetic**:
  - Pure black background (`#000000`) with clean San Francisco system typography (`-apple-system, BlinkMacSystemFont, "SF Pro Text"`).
  - Monochrome white-on-black hierarchy with generous negative space and zero distracting visual clutter.
- **Responsive & Touch-Optimized**:
  - Designed for smartphones (320px–480px), tablets/iPads (768px–1024px), laptops, and 4K ultra-wide monitors.
  - Smooth lerp interpolation for silky scroll playback on touch devices.
- **E-Commerce & Direct WhatsApp Ordering**:
  - Live bag/cart with slide-over drawer and coupon system (`RAJPUT10`).
  - Pre-formatted WhatsApp order generator linked directly to the store (`+91 9623270683`).
  - Store pickup at Mapusa Municipal Market or Goa-wide delivery.
- **Store Credentials & Trust**:
  - Address: Shop No. 178, Mapusa Municipal Market, Mapusa-Goa
  - Phones: `+91 9623270683` / `+91 9421242934`
  - GSTIN: `30AEXPR7400N1ZZ` | Email: `PHRajpoot@proton.me`

---

## 🚀 Getting Started (Local Development)

### 1. Clone & Install Dependencies

```bash
git clone https://github.com/YOUR_USERNAME/ph-rajput-stationery.git
cd ph-rajput-stationery
npm install
```

### 2. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build

```bash
npm run build
npm run start
```

---

## 🌐 Deploying to Netlify

This project is fully configured for 1-click deployment on Netlify with the included `netlify.toml`.

### Method A: Connect via GitHub (Recommended)

1. Push your repository to GitHub.
2. Log into [Netlify](https://app.netlify.com/).
3. Click **"Add new site"** → **"Import an existing project"**.
4. Select **GitHub** and choose your repository.
5. Netlify will automatically detect settings from `netlify.toml`:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `.next`
   - **Node Version**: `20`
6. Click **Deploy Site**.

### Method B: Netlify CLI

```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

---

## 📂 Project Structure

```
├── app/
│   ├── geometry/
│   │   └── page.tsx           # Classmate Asteroid 3D Geometry Showcase
│   ├── stationery/
│   │   └── page.tsx           # All Stationery Department Catalog
│   ├── globals.css            # San Francisco font & pure black styles
│   ├── layout.tsx             # Root layout with Cart & Search providers
│   └── page.tsx               # Home Dashboard (Parker Pen 3D Scrollytelling)
├── components/
│   ├── CartDrawer.tsx         # Slide-over cart with WhatsApp checkout
│   ├── CategorySection.tsx    # Stationery department navigation
│   ├── Footer.tsx             # Store hours, address, and legal disclaimers
│   ├── HeroScrollytelling.tsx # 300-Frame Classmate Asteroid Canvas Engine
│   ├── InteractiveToolModal.tsx # Geometry tool inspection modal
│   ├── Navbar.tsx             # Apple-style responsive header navigation
│   ├── ParkerEcommerceSection.tsx # Parker Pen purchase & gift sets
│   ├── ParkerScrollytelling.tsx # 300-Frame Parker Pen Canvas Engine
│   ├── ProductEcommerceSection.tsx # Classmate Asteroid purchase & packs
│   ├── SearchDialog.tsx       # Instant search modal (Cmd+K / Ctrl+K)
│   └── StoreTrustSection.tsx  # Mapusa store credentials & business card
├── context/
│   └── CartContext.tsx        # Global shopping bag state & coupons
├── public/
│   ├── frames/                # 300 frames of Classmate Asteroid
│   ├── parker-frames/         # 300 frames of Parker IM Pen
│   ├── business card.jpeg     # Store business card
│   └── logo.jpeg              # Official store logo
├── netlify.toml               # Netlify Next.js deployment configuration
└── package.json               # Dependencies and scripts
```

---

## ⚖️ Brand Hierarchy & Disclaimers

- **Retailer**: **P.H. Rajput & Sons** (Est. Stationery & Co.) is an independent authorized stationery retailer located at Shop No. 178, Mapusa Municipal Market, Mapusa-Goa.
- **Featured Brands**: **Parker** and **Classmate** (ITC Limited) are registered trademarks of their respective owners. Products displayed are genuine inventory available for purchase through P.H. Rajput & Sons.

---

## 📄 License

© 2026 P.H. Rajput & Sons. All rights reserved.
