export default function Result({ params }: { params: { id: string } }) {
  return (
    <main style={{ maxWidth: 900, margin: "0 auto", padding: 24 }}>
      <h1 style={{ fontSize: 28, margin: "20px 0 10px" }}>Résultat (démo)</h1>
      <p style={{ opacity: 0.8 }}>
        ID: <b>{params.id}</b>
      </p>

      <div style={{ marginTop: 16, border: "1px solid #eee", borderRadius: 16, padding: 16 }}>
        <div style={{ fontWeight: 800, fontSize: 22 }}>Score : 42/100</div>
        <p style={{ opacity: 0.85 }}>Fuites détectées : visibilité locale + relance + preuve.</p>
        <p style={{ fontWeight: 700 }}>Plan 30 jours : Google Business + page de conversion + relance WhatsApp.</p>
      </div>
    </main>
  );
}
