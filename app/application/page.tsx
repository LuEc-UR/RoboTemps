import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/api/auth/[...nextauth]/route";

export default async function ApplicationHome() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/application/login");
  }

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome, {session!.user!.email}</h1>
    </div>
  );
}
