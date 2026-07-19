import type { Metadata } from "next";

// Keep the admin area out of search indexes (belt-and-suspenders with robots.ts).
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function AdminSegmentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
