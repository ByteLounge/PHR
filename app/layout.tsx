import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import { CartDrawer } from "@/components/CartDrawer";
import { SearchDialog } from "@/components/SearchDialog";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "P.H. Rajput & Sons — Modern Stationery Store",
  description:
    "P.H. Rajput & Sons (Shop No. 178, Mapusa Municipal Market, Goa). Discover the Parker IM Premium Pen and Classmate Asteroid 3D interactive collections.",
  keywords: [
    "P.H. Rajput & Sons",
    "Parker Pen Goa",
    "Classmate Asteroid Compass Box",
    "Stationery Store Mapusa",
    "Mapusa Municipal Market",
  ],
  authors: [{ name: "P.H. Rajput & Sons" }],
  icons: {
    icon: "/logo.jpeg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-black text-white selection:bg-white selection:text-black">
        <CartProvider>
          {children}
          <CartDrawer />
          <SearchDialog />
        </CartProvider>
      </body>
    </html>
  );
}
