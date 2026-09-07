export default function Header() {
  return (
    <header className="border-b border-line bg-cream/95 backdrop-blur sticky top-0 z-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-2">
        <a href="/" className="flex items-center gap-1.5 min-w-0 shrink-0">
          <span className="font-arabic text-lg sm:text-2xl text-palm shrink-0" aria-hidden="true">
            ﷽
          </span>
          <span className="font-headline text-base sm:text-lg font-semibold tracking-tight truncate">
            Al-Quran
          </span>
        </a>
        <nav className="flex items-center gap-3 sm:gap-5 shrink-0">
          <a
            href="/favorites"
            className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-ink-soft hover:text-palm transition-colors"
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="shrink-0"
            >
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            <span>Favorites</span>
          </a>
          <a
            href="/"
            className="text-xs sm:text-sm text-ink-soft hover:text-palm transition-colors whitespace-nowrap"
          >
            All Surahs
          </a>
        </nav>
      </div>
    </header>
  );
}