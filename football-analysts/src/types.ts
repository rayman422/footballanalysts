export type Team = {
  id: string;
  name: string;
  shortName: string;
  founded: number;
  country: string;
};

export type Player = {
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

export type Match = {
  id: string;
  date: string; // ISO
  homeTeamId: string;
  awayTeamId: string;
  homeGoals: number;
  awayGoals: number;
  homeXg: number;
  awayXg: number;
  possessionHome: number; // 0-100
};

