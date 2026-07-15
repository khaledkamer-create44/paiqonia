import { db } from "@/lib/db";
import CreateCohortForm from "./CreateCohortForm";

export const dynamic = "force-dynamic";

export default async function AdminCohortsPage() {
  const cohorts = await db.cohort.findMany({
    include: { matn: true, supervisor: true, students: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main style={{ maxWidth: 800, margin: "60px auto", padding: "0 20px" }}>
      <h1 style={{ fontFamily: "'Aref Ruqaa', serif", fontSize: 30, marginBottom: 30 }}>
        إدارة الدفعات
      </h1>

      <CreateCohortForm />

      <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 12 }}>
        {cohorts.map((c) => (
          <div
            key={c.id}
            style={{
              padding: "16px 20px",
              borderRadius: 6,
              background: "var(--ink-800)",
              border: "1px solid rgba(189,143,62,0.25)",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: 6 }}>{c.name}</div>
            <div style={{ fontSize: 13, opacity: 0.75 }}>
              المتن: {c.matn.name} · الطلاب: {c.students.length} · المشرف:{" "}
              {c.supervisor?.name || "بدون مشرف"}
            </div>
            <div style={{ fontSize: 13, marginTop: 8, color: "var(--brass-light)" }}>
              كود الدخول: {c.inviteCode}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
