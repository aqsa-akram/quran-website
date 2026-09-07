const BASE = "https://raw.githubusercontent.com/risan/quran-json/main/dist";

/**
 * Sab 114 surahs ki basic info (naam, ayah count, meccan/medinan).
 * Ye build-time pe fetch hota hai aur static rehta hai (revalidate).
 */
export async function getAllSurahs() {
  const res = await fetch(`${BASE}/chapters/index.json`, {
    next: { revalidate: 2592000 }, // 30 din - Quran ka text kabhi nahi badalta
  });
  if (!res.ok) throw new Error("Failed to fetch surah list");
  return res.json();
}

/**
 * Ek surah ka pura data - Arabic text + Urdu translation, ayah by ayah.
 */
export async function getSurah(number) {
  const res = await fetch(`${BASE}/chapters/ur/${number}.json`, {
    next: { revalidate: 2592000 },
  });
  if (!res.ok) throw new Error(`Failed to fetch surah ${number}`);
  return res.json();
}

/**
 * Surah k naam ka simple URL-safe slug bana deta hai (SEO-friendly links k liye).
 * e.g. "Al-Baqarah" -> "al-baqarah"
 */
export function slugify(transliteration) {
  return transliteration
    .toLowerCase()
    .replace(/'/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
