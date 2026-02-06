import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { bountyPrograms } from "@/lib/data";

// Force dynamic rendering for API route
export const dynamic = 'force-dynamic';

const protocolSchema = z.object({
  name: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().optional().nullable(),
  website_url: z.string().url().optional().nullable(),
  twitter_handle: z.string().optional().nullable(),
  logo_url: z.string().url().optional().nullable(),
  category: z.string().optional().nullable(),
  chain: z.string().optional().nullable(),
  bountyPool: z.number().default(0),
  severity: z.enum(["critical", "high", "medium", "low", "informational"]).optional(),
});

export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({ protocols: bountyPrograms });
  } catch (error) {
    console.error("Error fetching protocols:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = protocolSchema.parse(body);

    // Database not connected - return error
    return NextResponse.json(
      { error: "Database not connected. Cannot create new protocol." },
      { status: 503 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }
    console.error("Error creating protocol:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
