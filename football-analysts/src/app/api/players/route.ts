import { NextResponse } from "next/server";
import { seedMockData } from "@/lib/mock";

export function GET() {
  const { players } = seedMockData();
  return NextResponse.json(players);
}

