import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "./providers/providers";
import { CartProvider } from "@/app/context/CartContext";
import { ModalProvider } from "@/app/context/ModalProvider";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Digi Matin",
  description: "My PWA App",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#ff0000",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ff0000" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          <CartProvider>
            <ModalProvider>
              {children}
            </ModalProvider>
          </CartProvider>
        </Providers>
      </body>
    </html>
  );
}

