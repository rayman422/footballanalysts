"use client";
import useSWR from "swr";

type Player = {
  id: string;
  name: string;
  position: "GK" | "DF" | "MF" | "FW";
  teamId: string;
  age: number;
  nationality: string;
  xg: number;
  xa: number;
  goals: number;
  assists: number;
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function PlayersPage() {
  const { data, error, isLoading } = useSWR<Player[]>("/api/players", fetcher);
  if (isLoading) return <p>Loading players…</p>;
  if (error) return <p>Failed to load players.</p>;
  const players = (data ?? []).slice().sort((a, b) => b.xg - a.xg);
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Players</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {players.slice(0, 30).map((p) => (
          <div key={p.id} className="rounded-md border border-black/10 dark:border-white/10 p-4">
            <p className="font-medium">{p.name} <span className="text-xs text-foreground/60">({p.position})</span></p>
            <p className="text-sm text-foreground/70">{p.nationality} • {p.age} yrs</p>
            <p className="text-sm mt-1">xG {p.xg.toFixed(2)} • xA {p.xa.toFixed(2)} • G {p.goals} • A {p.assists}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

