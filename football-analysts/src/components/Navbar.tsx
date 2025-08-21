import Link from "next/link";

export default function Navbar() {
  return (
    <header className="border-b border-black/10 dark:border-white/10 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-40">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          Football Analysts
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/matches" className="hover:underline underline-offset-4">
            Matches
          </Link>
          <Link href="/teams" className="hover:underline underline-offset-4">
            Teams
          </Link>
          <Link href="/players" className="hover:underline underline-offset-4">
            Players
          </Link>
        </nav>
      </div>
    </header>
  );
}

