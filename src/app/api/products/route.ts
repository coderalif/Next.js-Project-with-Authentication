import { NextResponse } from "next/server";
import { fetchBazarData } from "@/lib/bazar-api";

export async function GET() {
  try {
    return NextResponse.json(await fetchBazarData("products", 300));
  } catch {
    return NextResponse.json(
      { error: "দুইটি পণ্য API-তেই সংযোগ করা যায়নি।" },
      { status: 502 },
    );
  }
}
