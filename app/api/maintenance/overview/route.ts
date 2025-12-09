import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    upcoming: [
      { id: "m1", solutionId: "s1", plantName: "Plant Milano", dueInHours: 48 }
    ],
    overdue: [
      { id: "m2", solutionId: "s4", plantName: "Plant Torino", overdueHours: 12 }
    ]
  });
}
