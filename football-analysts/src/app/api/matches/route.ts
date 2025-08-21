import { NextResponse } from "next/server";
import { seedMockData } from "@/lib/mock";

export function GET() {
  const { matches } = seedMockData();
  return NextResponse.json(matches);
}

