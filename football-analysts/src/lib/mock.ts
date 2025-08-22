import { faker } from "@faker-js/faker";
import type { Team, Player, Match } from "@/types";

export function generateTeams(count: number): Team[] {
  return Array.from({ length: count }).map(() => ({
    id: faker.string.uuid(),
    name: `${faker.location.city()} FC`,
    shortName: faker.word.sample(3).toUpperCase(),
    founded: faker.number.int({ min: 1880, max: 2010 }),
    country: faker.location.country(),
  }));
}

export function generatePlayers(teams: Team[], perTeam: number): Player[] {
  const positions: Player["position"][] = ["GK", "DF", "MF", "FW"];
  return teams.flatMap((team) =>
    Array.from({ length: perTeam }).map(() => {
      const goals = faker.number.int({ min: 0, max: 25 });
      const assists = faker.number.int({ min: 0, max: 15 });
      const xg = Number((goals * faker.number.float({ min: 0.7, max: 1.2 })).toFixed(2));
      const xa = Number((assists * faker.number.float({ min: 0.7, max: 1.2 })).toFixed(2));
      return {
        id: faker.string.uuid(),
        name: faker.person.fullName(),
        position: faker.helpers.arrayElement(positions),
        teamId: team.id,
        age: faker.number.int({ min: 17, max: 38 }),
        nationality: faker.location.country(),
        xg,
        xa,
        goals,
        assists,
      };
    })
  );
}

export function generateMatches(teams: Team[], count: number): Match[] {
  return Array.from({ length: count }).map(() => {
    const [home, away] = faker.helpers.shuffle(teams).slice(0, 2);
    const homeGoals = faker.number.int({ min: 0, max: 5 });
    const awayGoals = faker.number.int({ min: 0, max: 5 });
    const homeXg = Number((homeGoals + faker.number.float({ min: -0.8, max: 0.8 })).toFixed(2));
    const awayXg = Number((awayGoals + faker.number.float({ min: -0.8, max: 0.8 })).toFixed(2));
    const possessionHome = faker.number.int({ min: 30, max: 70 });
    return {
      id: faker.string.uuid(),
      date: faker.date.recent({ days: 60 }).toISOString(),
      homeTeamId: home.id,
      awayTeamId: away.id,
      homeGoals,
      awayGoals,
      homeXg,
      awayXg,
      possessionHome,
    };
  });
}

export function seedMockData() {
  const teams = generateTeams(12);
  const players = generatePlayers(teams, 18);
  const matches = generateMatches(teams, 60);
  return { teams, players, matches };
}

