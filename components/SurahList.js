"use client";

import { useState } from "react";
import { slugify } from "@/lib/quran";

export default function SurahList({ surahs }) {
  const [query, setQuery] = useState("");

  const filtered = surahs.filter((s) => {
    const q = query.toLowerCase();
    return (
      s.transliteration.toLowerCase().includes(q) ||
      s.name.includes(query) ||
      String(s.id).includes(query)
    );
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search surah by name or number..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full rounded-full border border-line bg-white px-5 py-3 text-sm focus:outline-none focus:border-palm shadow-sm"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
        {filtered.map((surah) => (
          <a
            key={surah.id}
            href={`/surah/${surah.id}-${slugify(surah.transliteration)}`}
            className="flex items-center gap-4 rounded-lg border border-line bg-white px-4 py-3 hover:border-palm hover:shadow-sm transition-all"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold text-sm font-headline font-semibold">
              {surah.id}
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-headline font-semibold truncate">
                {surah.transliteration}
              </p>
              <p className="text-xs text-ink-soft">
                {surah.total_verses} verses · {surah.type === "meccan" ? "Meccan" : "Medinan"}
              </p>
            </div>
            <span className="font-arabic text-xl text-palm shrink-0">{surah.name}</span>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-ink-soft mt-10">No surah matches your search.</p>
      )}
    </div>
  );
}
