"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateCohortForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/admin/cohorts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, matnSlug: "al-baiquniyyah" }),
    });
    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "حدث خطأ");
      return;
    }
    setName("");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: 10 }}>
      <input
        placeholder="اسم الدفعة الجديدة (مثال: الدفعة ١٣)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{
          flex: 1,
          padding: "10px 14px",
          borderRadius: 4,
          border: "1px solid rgba(189,143,62,0.4)",
          background: "var(--ink-900)",
          color: "var(--parchment-light)",
        }}
      />
      <button
        type="submit"
        style={{
          padding: "10px 20px",
          borderRadius: 4,
          background: "var(--seal)",
          color: "var(--parchment-light)",
          border: "none",
          fontWeight: 700,
          cursor: "pointer",
        }}
      >
        إنشاء دفعة
      </button>
      {error && <p style={{ color: "var(--seal)" }}>{error}</p>}
    </form>
  );
}
