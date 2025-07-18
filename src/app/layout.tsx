import type { Metadata } from "next";
import { Suspense } from "react";
import { ReactQueryClientProvider } from "./component/ReactQueryClientProvider";
import { Geist, Geist_Mono, Inter } from "next/font/google";
import Header from "@/app/component/Header";
import "@/styles/globals.css";
import Footer from "./component/Footer";
import Spinner from "./component/Spinner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["100", "300", "400", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// export const metadata: Metadata = {
//   title: "",
//   description: "",
// };

export const metadata: Metadata = {
  title: {
    default: "Teneleven",
    template: "Teneleven | %s",
  },
  description: "Solusi teknologi dari Teneleven",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: "no",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable}   ${geistSans.variable} ${geistMono.variable}  antialiased  m-0 p-0`}
      >
        <ReactQueryClientProvider>
          <Header />
          <Suspense fallback={<Spinner />}>{children}</Suspense>
          <Footer />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
