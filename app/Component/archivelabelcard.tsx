"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import Barcode from "./barcode";

export default function ArchiveLabelCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const handleFlip = () => {
    const next = !isFlipped;
    setIsFlipped(next);

    if (next) {
      // 翻到背面
      gsap.to(frontRef.current, { rotateY: -180, duration: 0.7, ease: "power2.inOut" });
      gsap.to(backRef.current, { rotateY: 0, duration: 0.7, ease: "power2.inOut" });
    } else {
      // 翻回正面
      gsap.to(frontRef.current, { rotateY: 0, duration: 0.7, ease: "power2.inOut" });
      gsap.to(backRef.current, { rotateY: 180, duration: 0.7, ease: "power2.inOut" });
    }
  };

  return (
    <div
      onClick={handleFlip}
      style={{ perspective: "1200px" }}
      className="relative w-full cursor-pointer select-none"
    >
      {/* 正面 */}
      <div
        ref={frontRef}
        style={{ backfaceVisibility: "hidden", transform: "rotateY(0deg)" }}
        className="w-full bg-[#F7ECE6] text-[#1A1A1A] rounded-2xl p-6 flex flex-col justify-between shadow-xl"
      >
        <div>
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#1A1A1A]/75 mb-3">
            02 &nbsp;/&nbsp; ARCHIVE LABEL
          </p>
          <h2 className="font-serif text-3xl leading-[1.05] tracking-tight uppercase">
            PERSONAL<br />INDEX
          </h2>
        </div>

        <div className="my-5 py-3 border-y border-[#1A1A1A]/25 grid grid-cols-2 divide-x divide-[#1A1A1A]/25">
          <div className="pr-3">
            <div className="font-mono text-[9px] tracking-[0.15em] text-[#1A1A1A]/60 uppercase">TYPE</div>
            <div className="font-serif text-sm mt-1">DIGITAL</div>
          </div>
          <div className="pl-3">
            <div className="font-mono text-[9px] tracking-[0.15em] text-[#1A1A1A]/60 uppercase">OWNER</div>
            <div className="font-serif text-sm mt-1">DaoHui</div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 my-1">
          <Barcode color="#1A1A1A" className="w-36" />
          <div className="font-serif text-base leading-tight text-[#1A1A1A]/85">
            DH<br />001
          </div>
        </div>

        <p className="font-mono text-[9px] tracking-[0.14em] uppercase text-[#1A1A1A]/65 mt-4">
          PERSONAL ARCHIVE / SERIES 01
        </p>
      </div>

      {/* 背面 */}
      <div
        ref={backRef}
        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        className="absolute inset-0 w-full bg-[#F7ECE6] text-[#1A1A1A] rounded-2xl p-6 flex flex-col justify-between shadow-xl"
      >
        <div>
          <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#1A1A1A]/75 mb-3">
            02 &nbsp;/&nbsp; ARCHIVE LABEL
          </p>
          <h2 className="font-serif text-3xl leading-[1.05] tracking-tight uppercase">
            PERSONAL<br />INDEX
          </h2>
        </div>

        <div className="my-5 py-3 border-y border-[#1A1A1A]/25 grid grid-cols-2 divide-x divide-[#1A1A1A]/25">
          <div className="pr-3">
            <div className="font-mono text-[9px] tracking-[0.15em] text-[#1A1A1A]/60 uppercase">TYPE</div>
            <div className="font-serif text-sm mt-1">DIGITAL</div>
          </div>
          <div className="pl-3">
            <div className="font-mono text-[9px] tracking-[0.15em] text-[#1A1A1A]/60 uppercase">OWNER</div>
            <div className="font-serif text-sm mt-1">DaoHui</div>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 my-1">
          <div>
            <h3 className="font-serif text-sm font-medium mb-1.5">Whoami</h3>
            <ol className="font-serif text-xs space-y-1 text-[#1A1A1A]/90">
              <li>1. AIS3 Junior</li>
              <li>2. AIS3 Holyhack</li>
              <li>3. Red Team</li>
            </ol>
          </div>
          <div className="font-serif text-base leading-tight text-[#1A1A1A]/85">
            DH<br />002
          </div>
        </div>

        <p className="font-mono text-[9px] tracking-[0.14em] uppercase text-[#1A1A1A]/65 mt-4">
          PERSONAL ARCHIVE / SERIES 01
        </p>
      </div>
    </div>
  );
}