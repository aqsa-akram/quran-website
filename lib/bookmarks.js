const KEY = "quran-bookmarks";

function readAll() {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(bookmarks) {
  localStorage.setItem(KEY, JSON.stringify(bookmarks));
}

export function getBookmarks() {
  return readAll().sort((a, b) => b.addedAt - a.addedAt);
}

export function isBookmarked(surahId, ayahId) {
  return readAll().some((b) => b.surahId === surahId && b.ayahId === ayahId);
}

export function toggleBookmark({ surahId, surahName, slug, ayahId, arabicText, translation }) {
  const all = readAll();
  const exists = all.findIndex((b) => b.surahId === surahId && b.ayahId === ayahId);

  if (exists >= 0) {
    all.splice(exists, 1);
    writeAll(all);
    return false; // ab bookmark nahi hai
  }

  all.push({ surahId, surahName, slug, ayahId, arabicText, translation, addedAt: Date.now() });
  writeAll(all);
  return true; // ab bookmark ho gaya
}

export function removeBookmark(surahId, ayahId) {
  const all = readAll().filter((b) => !(b.surahId === surahId && b.ayahId === ayahId));
  writeAll(all);
}
