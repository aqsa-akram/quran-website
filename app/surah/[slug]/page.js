import { getAllSurahs, getSurah, slugify } from "@/lib/quran";
import { notFound } from "next/navigation";
import BookmarkButton from "@/components/BookmarkButton";

// Sab 114 surahs k liye static pages build time pe generate hote hain -
// isi se Google har surah ko alag page ki tarah crawl/index kar sakta hai.
export async function generateStaticParams() {
  const surahs = await getAllSurahs();
  return surahs.map((s) => ({
    slug: `${s.id}-${slugify(s.transliteration)}`,
  }));
}

function parseNumber(slug) {
  const match = slug.match(/^(\d+)/);
  return match ? parseInt(match[1], 10) : null;
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const number = parseNumber(slug);
  if (!number) return {};

  const surahs = await getAllSurahs();
  const info = surahs.find((s) => s.id === number);
  if (!info) return {};

  const title = `Surah ${info.transliteration} (${number}) — Read with Urdu Translation`;
  const description = `Read Surah ${info.transliteration} in Arabic with Urdu translation. ${info.total_verses} verses, ${info.type === "meccan" ? "Meccan" : "Medinan"} surah. Free and easy to read online.`;

  return {
    title,
    description,
    alternates: { canonical: `/surah/${number}-${slugify(info.transliteration)}` },
  };
}

export default async function SurahPage({ params }) {
  const { slug } = await params;
  const number = parseNumber(slug);
  if (!number || number < 1 || number > 114) notFound();

  const [surahs, surah] = await Promise.all([getAllSurahs(), getSurah(number)]);
  const info = surahs.find((s) => s.id === number);
  const prev = number > 1 ? surahs.find((s) => s.id === number - 1) : null;
  const next = number < 114 ? surahs.find((s) => s.id === number + 1) : null;

  // Surah 9 (At-Tawbah) ka istisna hai - ismein Bismillah nahi likhi jati
  const showBismillah = number !== 1 && number !== 9;

  return (
    <div className="mx-auto max-w-3xl px-6 py-12 sm:py-16">
      {/* Surah header */}
      <div className="text-center border-b border-line pb-8">
        <p className="text-sm text-ink-soft">
          Surah {number} of 114 · {info.type === "meccan" ? "Meccan" : "Medinan"} ·{" "}
          {info.total_verses} verses
        </p>
        <h1 className="font-arabic text-4xl sm:text-5xl text-palm mt-3">{info.name}</h1>
        <h2 className="font-headline text-2xl font-semibold mt-2">
          {info.transliteration}
        </h2>
        {showBismillah && (
          <p className="font-arabic text-2xl text-ink mt-6">
            بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
          </p>
        )}
      </div>

      {/* Ayahs */}
      <div className="mt-8 space-y-8">
        {surah.verses.map((ayah) => (
          <div key={ayah.id} className="border-b border-line/60 pb-8 last:border-0">
            <div className="flex items-start gap-3">
              <span className="mt-1 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold text-xs font-headline font-semibold">
                {ayah.id}
              </span>
              <p className="font-arabic text-2xl sm:text-3xl leading-loose text-ink text-right flex-1">
                {ayah.text}
              </p>
              <BookmarkButton
                surahId={number}
                surahName={info.transliteration}
                slug={slug}
                ayahId={ayah.id}
                arabicText={ayah.text}
                translation={ayah.translation}
              />
            </div>
            <p className="font-urdu text-lg leading-relaxed text-ink-soft text-right mt-3 pr-10">
              {ayah.translation}
            </p>
          </div>
        ))}
      </div>

      {/* Prev / Next navigation */}
      <div className="mt-12 flex items-center justify-between gap-4 text-sm">
        {prev ? (
          <a
            href={`/surah/${prev.id}-${slugify(prev.transliteration)}`}
            className="flex-1 rounded-lg border border-line px-4 py-3 hover:border-palm transition-colors"
          >
            <span className="text-ink-soft block text-xs">← Previous</span>
            <span className="font-headline font-medium">{prev.transliteration}</span>
          </a>
        ) : (
          <span className="flex-1" />
        )}
        {next ? (
          <a
            href={`/surah/${next.id}-${slugify(next.transliteration)}`}
            className="flex-1 rounded-lg border border-line px-4 py-3 text-right hover:border-palm transition-colors"
          >
            <span className="text-ink-soft block text-xs">Next →</span>
            <span className="font-headline font-medium">{next.transliteration}</span>
          </a>
        ) : (
          <span className="flex-1" />
        )}
      </div>
    </div>
  );
}
