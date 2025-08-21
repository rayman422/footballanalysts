"use client";
import useSWR from "swr";

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

export default function MatchDetails({ params }: { params: { id: string } }) {
  const { data: matches } = useSWR<Match[]>("/api/matches", fetcher);
  const match = matches?.find((m) => m.id === params.id);

  if (!matches) return <p>Loading…</p>;
  if (!match) return <p>Match not found.</p>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-semibold">Match Details</h1>
      <p className="text-sm text-foreground/70">{new Date(match.date).toLocaleString()}</p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-md border border-black/10 dark:border-white/10 p-4">
          <p className="font-medium">Score</p>
          <p className="text-3xl">{match.homeGoals} - {match.awayGoals}</p>
        </div>
        <div className="rounded-md border border-black/10 dark:border-white/10 p-4">
          <p className="font-medium">Expected Goals (xG)</p>
          <p className="text-3xl">{match.homeXg.toFixed(2)} - {match.awayXg.toFixed(2)}</p>
        </div>
        <div className="rounded-md border border-black/10 dark:border-white/10 p-4">
          <p className="font-medium">Possession</p>
          <p className="text-3xl">{match.possessionHome}% - {100 - match.possessionHome}%</p>
        </div>
      </div>
    </div>
  );
}