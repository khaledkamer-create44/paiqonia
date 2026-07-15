"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", password: "", inviteCode: "" });
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error || "حدث خطأ، حاول مرة أخرى");
      return;
    }
    router.push("/login");
  }

  return (
    <main style={{ maxWidth: 400, margin: "80px auto", padding: "0 20px" }}>
      <h1 style={{ fontFamily: "'Aref Ruqaa', serif", fontSize: 32, marginBottom: 10 }}>
        إنشاء حساب
      </h1>
      <p style={{ fontSize: 14, opacity: 0.7, marginBottom: 26 }}>
        محتاج كود الدفعة اللي معاك من المشرف عشان تكمّل التسجيل
      </p>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <input placeholder="الاسم" required value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })} style={inputStyle} />
        <input type="email" placeholder="البريد الإلكتروني" required value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} />
        <input type="password" placeholder="كلمة السر" required value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })} style={inputStyle} />
        <input placeholder="كود الدفعة (مثال: BQN-7F3K2A)" required value={form.inviteCode}
          onChange={(e) => setForm({ ...form, inviteCode: e.target.value })} style={inputStyle} />
        {error && <p style={{ color: "var(--seal)", fontSize: 14 }}>{error}</p>}
        <button type="submit" style={btnStyle}>تسجيل</button>
      </form>
    </main>
  );
}

const inputStyle: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: 4,
  border: "1px solid rgba(189,143,62,0.4)",
  background: "var(--ink-800)",
  color: "var(--parchment-light)",
  fontSize: 15,
};

const btnStyle: React.CSSProperties = {
  padding: "12px 14px",
  borderRadius: 4,
  background: "var(--seal)",
  color: "var(--parchment-light)",
  border: "none",
  fontWeight: 700,
  fontSize: 15,
  cursor: "pointer",
};
