const SWATCHES = [
  { id: "01", hex: "#F7ECE6", bg: "bg-[#F7ECE6]", text: "text-[#1A1A1A]", border: "" },
  { id: "02", hex: "#CAA07D", bg: "bg-[#CAA07D]", text: "text-[#1A1A1A]", border: "" },
  { id: "03", hex: "#1A1A1A", bg: "bg-[#1A1A1A]", text: "text-[#F7ECE6]", border: "border border-white/15" },
];

export default function RightSpecColumn() {
  return (
    <>
      {/* 03 / Color Specification */}
      <div className="w-full bg-[#1A1A1A] border border-white/15 rounded-2xl p-6">
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#F7ECE6]/80 mb-4">
          03 &nbsp;/&nbsp; COLOR SPECIFICATION
        </p>
        <div className="space-y-2.5">
          {SWATCHES.map((swatch) => (
            <div
              key={swatch.id}
              className={`${swatch.bg} ${swatch.text} ${swatch.border} rounded-md px-4 py-3 flex justify-between items-center font-mono text-xs tracking-wider`}
            >
              <span>{swatch.id}</span>
              <span>{swatch.hex}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 04 / Connection Label */}
      <div>
        <div className="w-full bg-[#CAA07D] text-[#1A1A1A] rounded-2xl p-6">
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#1A1A1A]/80 mb-4">
            04 &nbsp;/&nbsp; CONNECTION LABEL
          </p>
          <div className="text-4xl font-bold tracking-tight pb-3 border-b border-[#1A1A1A]/30">
            DH—01
          </div>
          <p className="font-bold text-xs tracking-wide uppercase mt-3">
            READ. SHARE. BUILD.
          </p>
          <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#1A1A1A]/75 mt-5">
            BLOG &nbsp;/&nbsp; X &nbsp;/&nbsp; GITHUB
          </p>
        </div>

        <span className="block mt-3 font-mono text-[10px] tracking-[0.18em] text-[#F7ECE6]/50 uppercase">
          04 — CONNECTION STRIP
        </span>
      </div>
    </>
  );
}