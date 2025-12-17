import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Hima - Full Stack Developer | IIT Kharagpur",
  description: "Portfolio of Hima, a Full Stack Developer and M.Tech student at IIT Kharagpur specializing in React, Next.js, and Chemical Engineering.",
  keywords: ["Full Stack Developer", "IIT Kharagpur", "React Developer", "Next.js", "Chemical Engineer", "Hima Portfolio"],
  authors: [{ name: "Hima" }],
  openGraph: {
    title: "Hima - Full Stack Developer",
    description: "Portfolio showcasing web development projects, competitive programming, and engineering work",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}