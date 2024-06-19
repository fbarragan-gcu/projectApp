import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "./ui/footer/page";
import TopNav from "./ui/topnav/page";
import PrelineScript from "./PrelineScript";
import NavBar from "./ui/navbar/page";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ProjectApp - GCU Capstone",
  description: "Capstone Project for GCU CST-451/452",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Update Company Here
  const companyName = "ProjectApp";
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col">
        {/* <TopNav companyName={companyName} /> */}
        <NavBar />
        <main className="min-h-screen md:container mx-auto p-5">
          {children}
        </main>
        <Footer companyName={companyName} />
      </body>
      {/* Loands JS for Preline CSS */}
      <PrelineScript />
    </html>
  );
}
