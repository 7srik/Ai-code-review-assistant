import React from "react";

export default function CodeEditor({ value, onChange }: { value: string; onChange: (v: string) => void; }) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ width: "100%", height: 400, fontFamily: "monospace", fontSize: 13, padding: 12 }}
    />
  );
}
