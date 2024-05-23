import { Inter } from "next/font/google";
import "./globals.css";
import  Navbar  from '../components/navbar'
import { Children } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({children}) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <Navbar />
       
        {children}
        </body>
    </html>
  );
}
