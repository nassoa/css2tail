export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { convertCssToTailwind } from "@/lib/together-ai";

export async function POST(request: Request) {
  try {
    const { css } = await request.json();

    if (!css) {
      return NextResponse.json(
        { error: "CSS input is required" },
        { status: 400 }
      );
    }

    const tailwindClasses = await convertCssToTailwind(css);

    return NextResponse.json({ tailwindClasses });
  } catch (error) {
    console.error("Error converting CSS to Tailwind:", error);
    return NextResponse.json(
      { error: "Failed to convert CSS to Tailwind" },
      { status: 500 }
    );
  }
}
