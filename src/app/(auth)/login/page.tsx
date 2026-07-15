"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.error) {
      setError("البريد الإلكتروني أو كلمة السر غير صحيحة");
      return;
    }
    router.push("/dashboard");
  }

  return (
    <main style={{ maxWidth: 400, margin: "80px auto", padding: "0 20px" }}>
      <h1 style={{ fontFamily: "'Aref Ruqaa', serif", fontSize: 32, marginBottom: 30 }}>
        تسجيل الدخول
      </h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <input
          type="email"
          placeholder="البريد الإلكتروني"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="كلمة السر"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        {error && <p style={{ color: "var(--seal)", fontSize: 14 }}>{error}</p>}
        <button type="submit" style={btnStyle}>دخول</button>
      </form>
      <p style={{ marginTop: 20, fontSize: 14, opacity: 0.7 }}>
        مالكش حساب؟ <a href="/register" style={{ color: "var(--brass-light)" }}>سجّل بكود دفعتك</a>
      </p>
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
