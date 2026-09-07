import { getAllSurahs, slugify } from "@/lib/quran";
import SurahList from "@/components/SurahList";

// Ye surahs log sabse zyada individually search karte hain -
// homepage pe upar dikhana traffic aur UX dono k liye acha hai
const POPULAR = ["Al-Fatihah", "Ya-Sin", "Al-Kahf", "Ar-Rahman", "Al-Mulk", "Al-Waqi'ah"];

export default async function Home() {
  const surahs = await getAllSurahs();
  const popular = POPULAR.map((name) => surahs.find((s) => s.transliteration === name)).filter(
    Boolean
  );

  return (
    <div className="mx-auto max-w-4xl px-6 py-14 sm:py-20">
      <div className="text-center">
        <span className="font-arabic text-4xl text-palm block" aria-hidden="true">
          القرآن الكريم
        </span>
        <h1 className="font-headline text-3xl sm:text-4xl font-semibold tracking-tight mt-4">
          Read the Quran Online
        </h1>
        <p className="text-ink-soft mt-3 max-w-lg mx-auto leading-relaxed">
          All 114 surahs with Arabic text and Urdu translation. Free, fast, and
          easy to read — no signup needed.
        </p>
      </div>

      {/* Popular surahs - quick access */}
      <div className="mt-10">
        <h2 className="text-xs font-medium text-ink-soft uppercase tracking-wide">
          Frequently read
        </h2>
        <div className="flex flex-wrap gap-2 mt-3">
          {popular.map((s) => (
            <a
              key={s.id}
              href={`/surah/${s.id}-${slugify(s.transliteration)}`}
              className="rounded-full border border-line bg-white px-4 py-2 text-sm font-medium hover:border-palm hover:text-palm transition-colors"
            >
              {s.transliteration}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xs font-medium text-ink-soft uppercase tracking-wide mb-3">
          All surahs
        </h2>
        <SurahList surahs={surahs} />
      </div>
    </div>
  );
}
