import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    // qui dentro il tuo JSON di esempio
    "user": {
    "email": "user@example.com",
    "role": "OEM",
    "plan": "OEM Pro",
    "status": "active"
  }
  });
}