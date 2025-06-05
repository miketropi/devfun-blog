import Header from "./components/Header";
import Footer from "./components/Footer";
import { Geist, Geist_Mono, Space_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-sans",
  subsets: ['latin'],
  weight: ['400', '700'],
});

export const metadata = {
  title: "DevFun Blog - Web Development Tutorials & Insights",
  description: "Discover the latest trends, tutorials, and insights in web development, programming, and technology. Learn React, Next.js, CSS, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceMono.variable} antialiased`}
      >
        <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
          <Header />
          {children}
          <Footer />
      </div>
      </body>
    </html>
  );
}
