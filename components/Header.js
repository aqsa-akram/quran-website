export default function Header() {
  return (
    <header className="border-b border-line bg-cream/95 backdrop-blur sticky top-0 z-10">
      <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2">
          <span className="font-arabic text-2xl text-palm" aria-hidden="true">
            ﷽
          </span>
          <span className="font-headline text-lg font-semibold tracking-tight">
            Al-Quran
          </span>
        </a>
        <nav className="flex items-center gap-5">
          <a
            href="/favorites"
            className="flex items-center gap-1.5 text-sm text-ink-soft hover:text-palm transition-colors"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
            Favorites
          </a>
          <a
            href="/"
            className="text-sm text-ink-soft hover:text-palm transition-colors"
          >
            All Surahs
          </a>
        </nav>
      </div>
    </header>
  );
}
