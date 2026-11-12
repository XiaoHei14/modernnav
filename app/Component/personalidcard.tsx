"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import Barcode from "./barcode";

const SOCIAL_LINKS = [
  { id: "1.", label: "DaoHui Blog", href: "https://daohui.site" },
  { id: "2.", label: "Twitter/X", href: "https://x.com/daohui587" },
  { id: "3.", label: "GitHub", href: "https://github.com/XiaoHei14" },
];

const FORTE_LIST = ["1. Full Stack Dev.", "2. DevOps", "3. CyberSecurity Researcher"];
const SKILL_LIST = ["1. Web Security", "2. Cloud Security", "3. pwn", "4. rev"];

export default function PersonalIdCard() {
  const [isFlipped, setIsFlipped] = useState(false);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const flipCard = (toBack: boolean) => {
    setIsFlipped(toBack);

    if (toBack) {
      gsap.to(frontRef.current, { rotateY: -180, duration: 0.8, ease: "power2.inOut" });
      gsap.to(backRef.current, { rotateY: 0, duration: 0.8, ease: "power2.inOut" });
    } else {
      gsap.to(frontRef.current, { rotateY: 0, duration: 0.8, ease: "power2.inOut" });
      gsap.to(backRef.current, { rotateY: 180, duration: 0.8, ease: "power2.inOut" });
    }
  };

  return (
    <div style={{ perspective: "1500px" }} className="relative w-full">
      {/* 正面 */}
      <div
        ref={frontRef}
        style={{ backfaceVisibility: "hidden", transform: "rotateY(0deg)" }}
        className={`w-full bg-[#1A1A1A] border border-white/15 rounded-2xl p-8 md:p-10 flex flex-col justify-between shadow-2xl ${
          isFlipped ? "pointer-events-none" : "pointer-events-auto"
        }`}
      >
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-[#CAA07D] uppercase mb-4">
            PERSONAL IDENTITY &nbsp;/&nbsp; 001
          </p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[#F7ECE6]">
            DaoHui
          </h1>
          <p className="text-sm text-[#F7ECE6]/70 mt-3">
            A personal index of links &amp; ideas.
          </p>
        </div>

        <div className="my-8 py-8 border-y border-white/15 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          <Barcode color="#F7ECE6" className="w-48" />
          <div className="sm:pr-6">
            <div className="text-6xl font-bold text-[#CAA07D] leading-none tracking-tight">01</div>
            <div className="font-mono text-[10px] tracking-[0.18em] text-[#F7ECE6]/60 uppercase mt-2 leading-relaxed">
              DIGITAL<br />PERSONAL INDEX
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-xl text-[#F7ECE6] mb-5">Social</h2>
          <ul className="space-y-4">
            {SOCIAL_LINKS.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between font-serif text-lg text-[#F7ECE6]/90 hover:text-[#CAA07D] transition-colors"
                >
                  <span>
                    <span className="mr-2 text-[#F7ECE6]/70 group-hover:text-[#CAA07D]">{link.id}</span>
                    {link.label}
                  </span>
                  <span className="font-mono text-sm text-[#CAA07D] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 pt-6 border-t border-white/15">
          <button
            type="button"
            onClick={() => flipCard(true)}
            className="w-full text-left bg-[#CAA07D] hover:bg-[#d5b090] text-[#1A1A1A] font-medium text-sm px-5 py-3.5 rounded-lg transition-colors cursor-pointer"
          >
            Resume
          </button>
          <div className="mt-6 flex items-center gap-6 font-mono text-[10px] tracking-[0.2em] text-[#F7ECE6]/45 uppercase">
            <span>DAOHUI</span><span>/</span><span>KEEP EXPLORING</span>
          </div>
        </div>
      </div>

      {/* 背面 */}
      <div
        ref={backRef}
        style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        className={`absolute inset-0 w-full bg-[#1A1A1A] border border-white/15 rounded-2xl p-8 md:p-10 flex flex-col justify-between shadow-2xl ${
          isFlipped ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        <div>
          <p className="font-mono text-[11px] tracking-[0.2em] text-[#CAA07D] uppercase mb-4">
            PERSONAL IDENTITY &nbsp;/&nbsp; 001
          </p>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-[#F7ECE6]">
            Resume
          </h1>
          <p className="text-sm text-[#F7ECE6]/70 mt-3">
            A personal index of links &amp; ideas.
          </p>
        </div>

        <div className="my-6 py-6 border-y border-white/15 flex flex-col sm:flex-row items-start justify-between gap-6">
          <div>
            <h2 className="font-serif text-xl text-[#F7ECE6] mb-3">Fortè</h2>
            <ul className="space-y-2 font-serif text-base text-[#F7ECE6]/90">
              {FORTE_LIST.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="sm:pr-6 sm:self-center">
            <div className="text-6xl font-bold text-[#CAA07D] leading-none tracking-tight">02</div>
            <div className="font-mono text-[10px] tracking-[0.18em] text-[#F7ECE6]/60 uppercase mt-2 leading-relaxed">
              DIGITAL<br />PERSONAL INDEX
            </div>
          </div>
        </div>

        <div>
          <h2 className="font-serif text-xl text-[#F7ECE6] mb-3">Skill</h2>
          <ul className="space-y-2 font-serif text-base text-[#F7ECE6]/90">
            {SKILL_LIST.map((skill) => (
              <li key={skill}>{skill}</li>
            ))}
          </ul>
        </div>

        <div className="mt-8 pt-6 border-t border-white/15">
          <button
            type="button"
            onClick={() => flipCard(false)}
            className="w-full text-left bg-[#CAA07D] hover:bg-[#d5b090] text-[#1A1A1A] font-medium text-sm px-5 py-3.5 rounded-lg transition-colors cursor-pointer"
          >
            About
          </button>
          <div className="mt-6 flex items-center gap-6 font-mono text-[10px] tracking-[0.2em] text-[#F7ECE6]/45 uppercase">
            <span>DAOHUI</span><span>/</span><span>KEEP EXPLORING</span>
          </div>
        </div>
      </div>
    </div>
  );
}