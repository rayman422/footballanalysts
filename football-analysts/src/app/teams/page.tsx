"use client";
import useSWR from "swr";

type Team = {
  id: string;
  name: string;
  shortName: string;
  founded: number;
  country: string;
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function TeamsPage() {
  const { data, error, isLoading } = useSWR<Team[]>("/api/teams", fetcher);
  if (isLoading) return <p>Loading teams…</p>;
  if (error) return <p>Failed to load teams.</p>;
  const teams = data ?? [];
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold tracking-tight">Teams</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {teams.map((t) => (
          <div key={t.id} className="rounded-md border border-black/10 dark:border-white/10 p-4">
            <p className="font-medium">{t.name}</p>
            <p className="text-sm text-foreground/70">Founded {t.founded} • {t.country}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

