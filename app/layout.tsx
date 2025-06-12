import type { Metadata, Viewport } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProviderClient } from "@/components/AuthProviderClient";
import { ClientLayout } from "@/components/ClientLayout";
import { GoogleTranslateInitializer } from "@/components/GoogleTranslateInitializer";
import { ThemeProvider } from "@/components/ThemeProvider";


const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: "Nilphyx",
    template: "%s | Nilphyx Platform",
  },
  description:
    "A comprehensive platform for AI education, data collaboration, and accessing compute resources.",
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f5f5", // Tailwind's secondary color (indigo-500)
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="min-h-screen flex flex-col font-poppins">
        <ThemeProvider>
          <AuthProviderClient>
            <ClientLayout>{children}</ClientLayout>
          </AuthProviderClient>
        </ThemeProvider>
        <GoogleTranslateInitializer />
        <div id="google_translate_element" style={{ display: "none" }}></div>
      </body>
    </html>
  );
}
