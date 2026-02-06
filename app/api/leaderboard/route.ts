import { NextRequest, NextResponse } from "next/server";
import { molts } from "@/lib/data";

// Force dynamic rendering for API route
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "50", 10);
  const period = searchParams.get("period") || "all"; // all, 90d, 30d, week

  try {
    // Apply limit if specified
    const leaderboard = molts.slice(0, limit);

    return NextResponse.json({
      leaderboard,
      period,
      total: molts.length,
    });
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
