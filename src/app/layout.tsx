import type { Metadata } from "next";
import { Geist, Geist_Mono, Caveat } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { ThemeProvider } from "@/components/ThemeProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
});

const SITE_URL = "https://matthewyang.ca";

// Profiles that identify Matthew Yang across the web (used for schema.org sameAs).
const SAME_AS = [
  "https://github.com/lesterholsterr",
  "https://www.linkedin.com/in/matthew--yang",
];

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Matthew Yang",
    template: "%s · Matthew Yang",
  },
  description:
    "Matthew Yang — University of Waterloo Computer Science & Finance student. Personal site with my portfolio, blog, and bookshelf.",
  keywords: [
    "Matthew Yang",
    "Matthew Yang Waterloo",
    "University of Waterloo",
    "Computer Science",
    "Finance",
    "portfolio",
    "blog",
  ],
  authors: [{ name: "Matthew Yang", url: SITE_URL }],
  creator: "Matthew Yang",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Matthew Yang",
    title: "Matthew Yang",
    description:
      "University of Waterloo Computer Science & Finance student. Portfolio, blog, and bookshelf.",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Matthew Yang",
    description:
      "University of Waterloo Computer Science & Finance student. Portfolio, blog, and bookshelf.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Matthew Yang",
      url: SITE_URL,
      jobTitle: "Computer Science & Finance Student",
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "University of Waterloo",
      },
      knowsAbout: ["Computer Science", "Finance", "Software Engineering"],
      sameAs: SAME_AS,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Matthew Yang",
      description:
        "Personal site of Matthew Yang — portfolio, blog, and bookshelf.",
      publisher: { "@id": `${SITE_URL}/#person` },
      inLanguage: "en-CA",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${caveat.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <ThemeProvider>
          <Navigation />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
