import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "./providers/AppProviders";
import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "./components/navbar";

export const metadata: Metadata = {
  title: "Qubit IL",
  description:
    "QUBIT is Israel’s first and only nonprofit dedicated exclusively to quantum computing. Founded by leaders from technology, academia, and policy, we are building a vibrant ecosystem that connects students, researchers, startups, corporates, and government. Through education, community events, partnerships, and grants, we are driving Israel’s position as a global quantum hub. Our vision is bold yet clear: to make Israel a top-10 quantum nation and ensure it plays a central role in the coming quantum revolution.",
  keywords: [
    "Qubit",
    "Quantum Computing",
    "Quantum Mechanics",
    "Quantum Algorithms",
    "Quantum Information",
    "Quantum Technology",
    "Quantum Research",
    "Quantum Development",
    "Quantum Innovation",
    "Quantum Startups",
    "Quantum",
    "Yahel Cohen",
  ],
  authors: [{ name: "Yahel Cohen" }],
  creator: "Yahel Cohen",
  openGraph: {
    title: "Yahel Cohen",
    description:
      "Passionate developer creating simple and effective solutions. Explore my projects and development approach.",
    url: "https://your-domain.com",
    siteName: "Yahel Cohen ",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Yahel Cohen",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-inter-tight antialiased`} lang="en">
        <Analytics />
        <AppProviders>
          <Navbar />
          {children}
        </AppProviders>
      </body>
    </html>
  );
}
