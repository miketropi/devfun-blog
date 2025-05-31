import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import StoreProvider from "./components/StoreProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "DevFun Blog - Web Development Tutorials & Insights",
  description: "Discover the latest trends, tutorials, and insights in web development, programming, and technology. Learn React, Next.js, CSS, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
