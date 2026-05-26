import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size    = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
        }}
      >
        <div
          style={{
            width: 20,
            height: 20,
            border: "1.5px solid #e8c4a0",
            borderRadius: 2,
            display: "flex",
            alignItems: "flex-end",
            overflow: "hidden",
          }}
        >
          <div style={{ width: "40%", height: "60%", background: "#e8c4a0" }} />
        </div>
      </div>
    ),
    { ...size }
  );
}
