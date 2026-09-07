"use client";

import { useEffect, useState } from "react";
import { isBookmarked, toggleBookmark } from "@/lib/bookmarks";

export default function BookmarkButton({ surahId, surahName, slug, ayahId, arabicText, translation }) {
  const [mounted, setMounted] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    setMounted(true);
    setSaved(isBookmarked(surahId, ayahId));
  }, [surahId, ayahId]);

  const handleClick = () => {
    const nowSaved = toggleBookmark({ surahId, surahName, slug, ayahId, arabicText, translation });
    setSaved(nowSaved);
  };

  if (!mounted) return <span className="h-7 w-7 inline-block" aria-hidden="true" />;

  return (
    <button
      onClick={handleClick}
      aria-label={saved ? "Remove bookmark" : "Bookmark this ayah"}
      className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full hover:bg-cream-soft transition-colors"
    >
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        className={saved ? "text-gold" : "text-ink-soft"}
      >
        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
      </svg>
    </button>
  );
}
