interface BarcodeProps {
  color?: string;
  className?: string;
}

export default function Barcode({ color = "#F7ECE6", className = "w-44" }: BarcodeProps) {
  // Bar widths and x-positions for a clean EAN-13 style visual
  const bars = [
    { x: 0, w: 2, h: 72 }, { x: 4, w: 2, h: 72 },
    { x: 10, w: 3, h: 64 }, { x: 16, w: 1, h: 64 }, { x: 19, w: 2, h: 64 },
    { x: 25, w: 4, h: 64 }, { x: 31, w: 1, h: 64 }, { x: 35, w: 2, h: 64 },
    { x: 40, w: 1, h: 64 }, { x: 44, w: 3, h: 64 }, { x: 50, w: 2, h: 64 },
    { x: 55, w: 1, h: 64 }, { x: 59, w: 4, h: 64 }, { x: 65, w: 1, h: 64 },
    { x: 69, w: 2, h: 64 }, { x: 74, w: 2, h: 64 },
    // Center guard
    { x: 80, w: 2, h: 72 }, { x: 84, w: 2, h: 72 },
    // Right half
    { x: 90, w: 3, h: 64 }, { x: 96, w: 2, h: 64 }, { x: 100, w: 1, h: 64 },
    { x: 104, w: 4, h: 64 }, { x: 111, w: 1, h: 64 }, { x: 115, w: 2, h: 64 },
    { x: 120, w: 3, h: 64 }, { x: 125, w: 1, h: 64 }, { x: 129, w: 2, h: 64 },
    { x: 134, w: 4, h: 64 }, { x: 141, w: 1, h: 64 }, { x: 145, w: 3, h: 64 },
    { x: 151, w: 1, h: 64 }, { x: 154, w: 2, h: 64 },
    // End guard
    { x: 160, w: 2, h: 72 }, { x: 164, w: 2, h: 72 },
  ];

  return (
    <div className={`flex flex-col ${className}`} style={{ color }}>
      <svg viewBox="0 0 166 74" className="w-full h-auto" fill="currentColor">
        {bars.map((bar, idx) => (
          <rect key={idx} x={bar.x} y={0} width={bar.w} height={bar.h} />
        ))}
      </svg>
      <div className="flex justify-between items-center font-mono text-[11px] tracking-widest mt-1 px-0.5">
        <span>1</span>
        <span>23456</span>
        <span>78999</span>
        <span>9</span>
      </div>
    </div>
  );
}