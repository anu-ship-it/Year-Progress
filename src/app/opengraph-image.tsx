import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt     = "Year Progress — Time, quantified";
export const size    = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  const now  = new Date();
  const year = now.getFullYear();
  const start = new Date(year, 0, 1).getTime();
  const total = (new Date(year, 11, 31, 23, 59, 59, 999).getTime() - start);
  const pct   = (((now.getTime() - start) / total) * 100).toFixed(2);

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width:  "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Georgia, serif",
          gap: 24,
        }}
      >
        <p style={{ fontSize: 18, color: "#3d3c3a", letterSpacing: "0.2em", margin: 0 }}>
          TIME, QUANTIFIED
        </p>
        <p style={{ fontSize: 96, color: "#f0ece4", margin: 0, fontStyle: "italic", letterSpacing: "-2px" }}>
          {pct}%
        </p>
        <p style={{ fontSize: 22, color: "#7a7770", margin: 0 }}>
          of {year} is gone
        </p>

        {/* Progress bar */}
        <div style={{ width: 600, height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 2, marginTop: 16, display: "flex" }}>
          <div style={{ width: `${pct}%`, height: "100%", background: "#e8c4a0", borderRadius: 2 }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
