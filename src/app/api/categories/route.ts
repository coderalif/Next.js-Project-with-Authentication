import { NextResponse } from "next/server";
import { fetchBazarData } from "@/lib/bazar-api";

export async function GET() {
  try {
    return NextResponse.json(await fetchBazarData("categories", 3600));
  } catch {
    return NextResponse.json(
      { error: "দুইটি ক্যাটাগরি API-তেই সংযোগ করা যায়নি।" },
      { status: 502 },
    );
  }
}
