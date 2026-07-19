import { ImageResponse } from "next/og";

export const alt = "Matthew Yang — University of Waterloo CS & Finance";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#EDE8E0",
          color: "#1f2937",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 110, fontWeight: 700, letterSpacing: "-2px" }}>
          Matthew Yang
        </div>
        <div style={{ fontSize: 44, marginTop: 24, color: "#4b5563" }}>
          University of Waterloo · Computer Science &amp; Finance
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 32,
            color: "#6b7280",
            display: "flex",
          }}
        >
          Portfolio · Blog · Bookshelf
        </div>
        <div
          style={{
            marginTop: 8,
            fontSize: 30,
            color: "#9ca3af",
            display: "flex",
          }}
        >
          matthewyang.ca
        </div>
      </div>
    ),
    { ...size }
  );
}
