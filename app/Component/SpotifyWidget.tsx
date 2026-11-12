"use client";

import { useEffect, useState } from "react";

interface SpotifyData {
  isPlaying: boolean;
  title?: string;
  artist?: string;
  albumImageUrl?: string;
  songUrl?: string;
}

export default function SpotifyCard() {
  const [song, setSong] = useState<SpotifyData | null>(null);

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const res = await fetch("/api/spotify");
        const data = await res.json();
        setSong(data);
      } catch (e) {
        console.error("Failed to fetch spotify track", e);
      }
    };

    fetchSong();
    const interval = setInterval(fetchSong, 5000);
    return () => clearInterval(interval);
  }, []);

  // 當離線或未播放時的 04 區塊
  if (!song || !song.isPlaying) {
    return (
      <div className="w-full bg-[#CAA07D] text-[#1A1A1A] rounded-2xl p-6 shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#1A1A1A]/80">
              04 &nbsp;/&nbsp; CONNECTION LABEL
            </p>
            <span className="w-2 h-2 rounded-full bg-[#1A1A1A]/30" />
          </div>
          <div className="text-3xl font-bold tracking-tight pb-3 border-b border-[#1A1A1A]/30">
            SPOTIFY
          </div>
          <p className="font-bold text-xs tracking-wide uppercase mt-3">
            OFFLINE / IDLE
          </p>
        </div>
        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#1A1A1A]/75 mt-8">
          MUSIC &nbsp;/&nbsp; TELEMETRY
        </p>
      </div>
    );
  }

  // 正在播放時的 04 區塊（保持 bg-[#CAA07D] 奶茶色）
  return (
    <a
      href={song.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group block w-full bg-[#CAA07D] text-[#1A1A1A] rounded-2xl p-6 shadow-xl transition-all hover:brightness-105"
    >
      {/* 標題與動態等化器 */}
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[10px] tracking-[0.18em] uppercase text-[#1A1A1A]/80">
          04 &nbsp;/&nbsp; CONNECTION LABEL
        </p>

        {/* 動態音波條 */}
        <div className="flex items-end gap-[2px] h-3">
          <span className="w-[2px] bg-[#1A1A1A] animate-[bounce_0.8s_infinite] h-2" />
          <span className="w-[2px] bg-[#1A1A1A] animate-[bounce_0.6s_infinite_0.2s] h-3" />
          <span className="w-[2px] bg-[#1A1A1A] animate-[bounce_0.9s_infinite_0.1s] h-1.5" />
          <span className="w-[2px] bg-[#1A1A1A] animate-[bounce_0.7s_infinite_0.3s] h-2.5" />
        </div>
      </div>

      {/* 專輯封面與即時曲名 */}
      <div className="flex items-center gap-4 py-2 border-y border-[#1A1A1A]/20">
        {song.albumImageUrl && (
          <img
            src={song.albumImageUrl}
            alt={song.title}
            className="w-12 h-12 rounded-lg object-cover shadow-sm border border-[#1A1A1A]/20"
          />
        )}
        <div className="flex-1 min-w-0">
          <p className="font-serif text-base font-bold text-[#1A1A1A] truncate group-hover:underline">
            {song.title}
          </p>
          <p className="font-mono text-[11px] tracking-wider text-[#1A1A1A]/70 truncate mt-0.5">
            {song.artist}
          </p>
        </div>
      </div>

      {/* 底部標籤 */}
      <div className="flex items-center justify-between mt-5">
        <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-[#1A1A1A]/75">
          NOW PLAYING
        </p>
        <span className="font-mono text-xs text-[#1A1A1A] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
          ↗
        </span>
      </div>
    </a>
  );
}