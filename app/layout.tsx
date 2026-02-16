import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shibika — Premium Indian Stationery | Where Ideas Find a Home",
  description:
    "Rooted in India's spirit of creativity and craftsmanship, Shibika offers exceptional quality notebooks and stationery at reasonable prices. Every stroke, every word, every idea finds a home.",
  keywords: [
    "Shibika",
    "notebooks",
    "stationery",
    "premium notebooks",
    "Indian stationery",
    "quality notebooks",
    "craftsmanship",
  ],
  openGraph: {
    title: "Shibika — Premium Indian Stationery",
    description:
      "Exceptional quality notebooks and stationery rooted in India's spirit of creativity and craftsmanship.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Inter:wght@100..900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
