"use client";

import { useEffect, useState } from "react";
import { getBookmarks, removeBookmark } from "@/lib/bookmarks";

export default function FavoritesPage() {
  const [bookmarks, setBookmarks] = useState(null);

  useEffect(() => {
    setBookmarks(getBookmarks());
  }, []);

  const handleRemove = (surahId, ayahId) => {
    removeBookmark(surahId, ayahId);
    setBookmarks(getBookmarks());
  };

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      <h1 className="font-headline text-3xl font-semibold tracking-tight">
        Your bookmarked ayahs
      </h1>
      <p className="text-ink-soft mt-2">
        Saved on this device — bookmarks are stored in your browser, not on our server.
      </p>

      {bookmarks === null && (
        <p className="text-ink-soft mt-10 text-center">Loading…</p>
      )}

      {bookmarks !== null && bookmarks.length === 0 && (
        <div className="mt-10 text-center text-ink-soft">
          <p>No bookmarks yet.</p>
          <a href="/" className="text-palm underline mt-2 inline-block">
            Browse surahs to start bookmarking
          </a>
        </div>
      )}

      <div className="mt-8 space-y-6">
        {bookmarks?.map((b) => (
          <div
            key={`${b.surahId}-${b.ayahId}`}
            className="rounded-lg border border-line bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <a
                href={`/surah/${b.slug}`}
                className="text-sm font-headline font-semibold text-palm hover:underline"
              >
                {b.surahName} — Ayah {b.ayahId}
              </a>
              <button
                onClick={() => handleRemove(b.surahId, b.ayahId)}
                className="text-xs text-ink-soft hover:text-red-600 transition-colors"
              >
                Remove
              </button>
            </div>
            <p className="font-arabic text-2xl leading-loose text-ink text-right mt-3">
              {b.arabicText}
            </p>
            <p className="font-urdu text-base text-ink-soft text-right mt-2">
              {b.translation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
