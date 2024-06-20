import type { Metadata } from "next";
import "./globals.css";
import Footer from "./ui/footer/page";
import PrelineScript from "./PrelineScript";
import NavBar from "./ui/navbar/page";

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
        <NavBar companyName={companyName} />
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
