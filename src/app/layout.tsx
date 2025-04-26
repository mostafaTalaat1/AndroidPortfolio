import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "MoreTech.io | Android Developer | JavaFX Developer | Tutorials",
  description: "Portfolio website for an Android & JavaFX developer with 5 years experience, showcasing projects and tutorials",
  icons: {
    icon: "/images/logo.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} no-cursor`}>
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}
