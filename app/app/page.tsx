import Link from "next/link";

export default function Home() {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 34, margin: "20px 0 10px" }}>Audit de croissance client — 3 minutes</h1>
      <p style={{ opacity: 0.8, marginBottom: 20 }}>
        Découvrez combien de clients votre entreprise perd chaque mois et le plan 30/60/90 pour corriger.
      </p>
      <Link
        href="/audit"
        style={{
          display: "inline-block",
          padding: "12px 16px",
          borderRadius: 12,
          background: "#000",
          color: "#fff",
          textDecoration: "none",
          fontWeight: 700
        }}
      >
        Lancer l’audit
      </Link>
    </main>
  );
}
