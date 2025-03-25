import React, { useState } from "react";

export default function App() {
  const [files, setFiles] = useState([]);
  const [stats, setStats] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    for (let file of files) {
      formData.append("files", file);
    }

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      setStats(data.stats || null);
      setRecommendations(data.recommendations || null);
    } catch (error) {
      console.error("Upload error:", error);
    }
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>📈 Portfolio Manager</h1>
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload & Analyze</button>

      {stats && (
        <div>
          <h2>📊 Portfolio Stats</h2>
          <ul>
            <li>CAGR: {stats.cagr}%</li>
            <li>Alpha: {stats.alpha}</li>
            <li>Beta: {stats.beta}</li>
            <li>Sharpe Ratio: {stats.sharpe}</li>
            <li>Sortino Ratio: {stats.sortino}</li>
          </ul>
        </div>
      )}

      {recommendations && (
        <div>
          <h2>🧠 AI Recommendations</h2>
          <ul>
            {recommendations.map((rec, i) => (
              <li key={i}>
                <strong>{rec.stock}</strong>: {rec.action} ({rec.confidence}%)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
