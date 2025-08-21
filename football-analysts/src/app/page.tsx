"use client";
import useSWR from "swr";
import XGBar from "@/components/charts/XGBar";
import PossessionPie from "@/components/charts/PossessionPie";
import FormLine from "@/components/charts/FormLine";

type Match = {
  id: string;
  date: string;
  homeXg: number;
  awayXg: number;
  possessionHome: number;
};

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function Home() {
  const { data, error, isLoading } = useSWR<Match[]>("/api/matches", fetcher);

  if (isLoading) return <p>Loading dashboard…</p>;
  if (error) return <p>Failed to load data.</p>;

  const latest = data?.[0];
  const trend = (data ?? []).slice(0, 8).reverse().map((m, idx) => ({
    label: String(idx + 1),
    value: Number((m.homeXg - m.awayXg).toFixed(2)),
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-baseline justify-between">
        <h1 className="text-2xl font-semibold tracking-tight">Football Analytics Dashboard</h1>
      </div>

      {latest && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="rounded-md border border-black/10 dark:border-white/10 p-4">
            <p className="font-medium mb-2">Latest Match xG</p>
            <XGBar home={latest.homeXg} away={latest.awayXg} />
          </div>
          <div className="rounded-md border border-black/10 dark:border-white/10 p-4">
            <p className="font-medium mb-2">Latest Match Possession</p>
            <PossessionPie home={latest.possessionHome} />
          </div>
          <div className="rounded-md border border-black/10 dark:border-white/10 p-4">
            <p className="font-medium mb-2">xG Differential Trend</p>
            <FormLine values={trend} />
          </div>
        </div>
      )}

      <div className="rounded-md border border-black/10 dark:border-white/10 p-4">
        <p className="font-medium">Recent Matches</p>
        <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {data?.slice(0, 6).map((m) => (
            <div key={m.id} className="text-sm p-3 rounded border border-black/10 dark:border-white/10">
              <p className="text-foreground/70">{new Date(m.date).toLocaleDateString()}</p>
              <p>xG {m.homeXg.toFixed(2)} - {m.awayXg.toFixed(2)} • Poss {m.possessionHome}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
