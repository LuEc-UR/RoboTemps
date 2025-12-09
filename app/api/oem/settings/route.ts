import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    companyName: "RoboTemps Inc.",
    primaryColor: "#0b74ff",
    theme: "light",
    user: {
      email: "user@example.com",
      role: "OEM",
      plan: "OEM Pro",
      status: "active"
    }
  });
}