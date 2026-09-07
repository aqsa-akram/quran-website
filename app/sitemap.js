import { getAllSurahs, slugify } from "@/lib/quran";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";

export default async function sitemap() {
  const surahs = await getAllSurahs();

  const surahRoutes = surahs.map((s) => ({
    url: `${SITE_URL}/surah/${s.id}-${slugify(s.transliteration)}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...surahRoutes,
  ];
}
