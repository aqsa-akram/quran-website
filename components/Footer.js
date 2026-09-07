export default function Footer() {
  return (
    <footer className="border-t border-line mt-20">
      <div className="mx-auto max-w-4xl px-6 py-8 text-center text-sm text-ink-soft">
        <p>Quran text and Urdu translation sourced from public Quran datasets.</p>
        <p className="mt-1">© {new Date().getFullYear()} Al-Quran Online.</p>
      </div>
    </footer>
  );
}
