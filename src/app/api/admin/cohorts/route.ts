import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import crypto from "crypto";

function generateInviteCode() {
  // كود مختصر وسهل النسخ، زي: BQN-7F3K2A
  return "BQN-" + crypto.randomBytes(4).toString("hex").toUpperCase();
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "غير مصرّح لك بهذا الإجراء" }, { status: 403 });
  }

  const { name, matnSlug, supervisorId, startDate } = await req.json();

  const matn = await db.matn.findUnique({ where: { slug: matnSlug } });
  if (!matn) {
    return NextResponse.json({ error: "المتن غير موجود" }, { status: 400 });
  }

  const cohort = await db.cohort.create({
    data: {
      name,
      matnId: matn.id,
      supervisorId: supervisorId || null,
      startDate: startDate ? new Date(startDate) : new Date(),
      inviteCode: generateInviteCode(),
    },
  });

  return NextResponse.json(cohort);
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || (session.user as any).role !== "ADMIN") {
    return NextResponse.json({ error: "غير مصرّح لك بهذا الإجراء" }, { status: 403 });
  }

  const cohorts = await db.cohort.findMany({
    include: { matn: true, supervisor: true, students: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(cohorts);
}
