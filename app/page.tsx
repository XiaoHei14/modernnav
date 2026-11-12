import PersonalIdCard from "./Component/personalidcard";
import ArchiveLabelCard from "./Component/archivelabelcard";
import RightSpecColumn from "./Component/rightspeccolumn";

export default function Home() {
  return (
    <main className="bg-[#0D0D0F] min-h-screen w-full px-8 py-10 md:px-16 md:py-12 flex flex-col justify-between text-[#F7ECE6] selection:bg-[#CAA07D] selection:text-[#1A1A1A]">
      {/* Top Header */}
      <header className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-white/15 pb-4 font-mono text-[11px] tracking-[0.2em] uppercase text-[#F7ECE6]/80 gap-2">
        <div>DH &nbsp;/&nbsp; PERSONAL ARCHIVE</div>
        <div className="flex items-center gap-6">
          <span>IDENTITY MATERIALS</span>
          <span>—</span>
          <span>VOL. 01</span>
        </div>
      </header>

      {/* Main 3-Column Bento Grid */}
      <section className="w-full max-w-[1380px] mx-auto my-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Left Column: 02 Archive Label */}
        <div className="lg:col-span-3 flex flex-col items-center lg:items-start">
          <ArchiveLabelCard />
          <span className="mt-3 font-mono text-[10px] tracking-[0.18em] text-[#F7ECE6]/50 uppercase self-start">
            02 — ARCHIVE SPECIMEN
          </span>
        </div>

        {/* Center Column: 01 Personal Identity */}
        <div className="lg:col-span-6 flex flex-col items-center">
          <PersonalIdCard />
          <span className="mt-3 font-mono text-[10px] tracking-[0.18em] text-[#F7ECE6]/50 uppercase self-start">
            01 — PERSONAL IDENTITY
          </span>
        </div>

        {/* Right Column: 03 Color Spec & 04 Connection Label */}
        <div className="lg:col-span-3 flex flex-col justify-between gap-8">
          <RightSpecColumn />
        </div>
      </section>

      {/* Bottom Footer */}
      <footer className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center font-mono text-[11px] tracking-[0.2em] uppercase text-[#F7ECE6]/60 gap-2">
        <div>EXPLORATIONS IN TYPE, LABELS &amp; DIGITAL IDENTITY</div>
        <div className="text-[#CAA07D]">DH–001 &nbsp;/&nbsp; 003</div>
      </footer>
    </main>
  );
}