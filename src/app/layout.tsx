import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Agri Management System",
  description: "Smart Agriculture Management Dashboard",
  keywords: [
    "Agriculture",
    "Farm Management",
    "Crop Management",
    "Inventory",
    "Farmers",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className="
          min-h-screen
          w-full
          overflow-x-hidden
          bg-gray-100
          text-gray-900
          antialiased
        "
      >
        <div className="min-h-screen w-full">
          {children}
        </div>
      </body>
    </html>
  );
}