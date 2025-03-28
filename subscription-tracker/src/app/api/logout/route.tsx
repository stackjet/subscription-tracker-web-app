import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  // Remove the value and expire the cookie
  const _cookies = await cookies();
  _cookies.delete("access_token");
  return NextResponse.json({}, { status: 200 });
}