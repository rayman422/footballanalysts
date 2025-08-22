import { NextResponse } from "next/server";
import { seedMockData } from "@/lib/mock";

export function GET() {
  const { teams } = seedMockData();
  return NextResponse.json(teams);
}

