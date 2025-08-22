"use client";
import useSWR from "swr";
import Link from "next/link";

type Match = {
  id: string;
  date: string;
  homeTeamId: string;
  awayTeamId: string;
  homeGoals: number;
  awayGoals: number;
  homeXg: number;
  awayXg: number;
  possessionHome: number;
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function MatchesPage() {
  const { data, error, isLoading } = useSWR<Match[]>("/api/matches", fetcher);

  if (isLoading) return <p>Loading matches…</p>;
  if (error) return <p>Failed to load matches.</p>;

  const matches = data ?? [];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Recent Matches</h1>
      <ul className="divide-y divide-black/10 dark:divide-white/10 rounded-md border border-black/10 dark:border-white/10 overflow-hidden">
        {matches.slice(0, 30).map((m) => (
          <li key={m.id} className="p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground/70">{new Date(m.date).toLocaleDateString()}</p>
              <p className="font-medium">
                <Link href={`/matches/${m.id}`} className="hover:underline">
                  {m.homeGoals} - {m.awayGoals} • xG {m.homeXg.toFixed(2)} - {m.awayXg.toFixed(2)}
                </Link>
              </p>
            </div>
            <div className="text-sm">Home possession {m.possessionHome}%</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

