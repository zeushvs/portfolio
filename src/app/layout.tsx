import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CursorProvider } from "@/components/cursor/CursorContext";
import { ScrollProgressProvider } from "@/components/ScrollProgressContext";
import CustomCursor from "@/components/cursor/CustomCursor";
import Navigation from "@/components/Navigation";
import GlobalPlayhead from "@/components/GlobalPlayhead";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Harshvardhan Singh — Editor / Cinematographer / Visual Designer",
  description:
    "A portfolio that feels like an edit. Brand commercials, cinematography, corporate editing, event films, travel films, photography, visual design and 3D.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full bg-[var(--bg)]">
        <CursorProvider>
          <ScrollProgressProvider>
            <Navigation />
            <GlobalPlayhead />
            {children}
          </ScrollProgressProvider>
          <CustomCursor />
        </CursorProvider>
        <div className="vignette" />
        <div className="grain" />
      </body>
    </html>
  );
}
