"use client";

import { useEffect, useState } from "react";

export default function SpotifyWidget() {
  const [song, setSong] = useState<any>(null);

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
    const interval = setInterval(fetchSong, 5000); // 每 5 秒更新一次狀態
    return () => clearInterval(interval);
  }, []);

  // 當沒有在播放音樂時的顯示
  if (!song || !song.isPlaying) {
    return (
      <div className="w-full bg-[#1A1A1A] border border-white/15 rounded-2xl p-6 font-mono text-xs text-[#F7ECE6]/60 flex items-center justify-between">
        <span>SPOTIFY &nbsp;/&nbsp; OFFLINE</span>
        <span className="w-2 h-2 rounded-full bg-white/20" />
      </div>
    );
  }

  // 正在播放時的精美卡片
  return (
    <a
      href={song.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full bg-[#1A1A1A] border border-white/15 rounded-2xl p-5 flex items-center gap-4 hover:border-[#CAA07D] transition-all group block shadow-xl"
    >
      <img
        src={song.albumImageUrl}
        alt={song.title}
        className="w-14 h-14 rounded-lg object-cover shadow-md"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="font-mono text-[10px] tracking-wider text-[#CAA07D] uppercase">
            NOW PLAYING
          </span>
        </div>
        <p className="font-serif text-base text-[#F7ECE6] truncate group-hover:text-[#CAA07D] transition-colors">
          {song.title}
        </p>
        <p className="font-mono text-xs text-[#F7ECE6]/60 truncate">
          {song.artist}
        </p>
      </div>
    </a>
  );
}