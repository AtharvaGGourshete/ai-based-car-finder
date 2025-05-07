import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({subsets:["latin"]})

export const metadata = {
  title: "Vehiql",
  description: "Get your favourite cars",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
    <html lang="en">
      <body
        className={`${inter.className}`}
      >
        <Header/>
        <main className="min-h-screen">{children}</main>
        <Toaster richColors/>
        <Footer/>
      </body>
    </html>
    </ClerkProvider>
  );
}
