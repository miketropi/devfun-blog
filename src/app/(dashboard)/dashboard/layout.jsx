import { Geist, Geist_Mono, Space_Mono } from "next/font/google";
import "../../(main)/globals.css";
import Sidebar from "@/app/components/dashboard/Sidebar"
import DashboardHeader from "@/app/components/dashboard/DashboardHeader";

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
  title: 'Dashboard',
  description: 'DevFun Blog Admin Dashboard',
}

export default function DashboardLayout({ children }) {
  return (
    <html lang="en">
      <body className={ `${geistSans.variable} ${geistMono.variable} ${spaceMono.variable} antialiased` }> 
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
          {/* Sidebar */}
          <Sidebar />
          
          {/* Main content */} 
          <div className="flex-1 flex flex-col lg:pl-64">
            <DashboardHeader />
            <main className="flex-1">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}