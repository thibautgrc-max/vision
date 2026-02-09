"use client";

import { useState } from "react";
import Link from "next/link";

export default function Audit() {
  const [company, setCompany] = useState("");
  const [city, setCity] = useState("");

  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, margin: "20px 0 10px" }}>Audit — étape 1</h1>
      <p style={{ opacity: 0.8, marginBottom: 20 }}>On commence simple. Ensuite on ajoute scoring + ROI.</p>

      <div style={{ display: "grid", gap: 12, maxWidth: 520 }}>
        <input
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          placeholder="Nom entreprise"
          style={{ padding: 12, borderRadius: 12, border: "1px solid #ddd" }}
        />
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Ville"
          style={{ padding: 12, borderRadius: 12, border: "1px solid #ddd" }}
        />

        <Link
          href={`/result/demo`}
          style={{
            display: "inline-block",
            padding: "12px 16px",
            borderRadius: 12,
            background: "#000",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 700,
            textAlign: "center"
          }}
        >
          Voir un résultat démo
        </Link>
      </div>
    </main>
  );
}
