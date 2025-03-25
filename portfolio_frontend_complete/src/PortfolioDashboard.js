import React, { useState } from "react";
import { UploadCloud, BarChart3, BrainCircuit } from "lucide-react";

export default function PortfolioDashboard() {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [stats, setStats] = useState(null);
  const [recommendations, setRecommendations] = useState(null);

  const API_BASE = "https://portfolio-management-qfrm.onrender.com";

  const handleFileUpload = async (event) => {
    const files = Array.from(event.target.files);
    setUploadedFiles(files);

    const formData = new FormData();
    files.forEach(file => formData.append("files", file));

    try {
      const response = await fetch(`${API_BASE}/upload`, {
        method: "POST",
        body: formData
      });

      const data = await response.json();
      if (data.stats) setStats(data.stats);
      if (data.recommendations) setRecommendations(data.recommendations);
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📂 Upload Groww Reports</h2>
      <input type="file" multiple accept=".xlsx,.pdf" onChange={handleFileUpload} />
      <br /><br />
      {stats && (
        <div>
          <h3>📊 Portfolio Statistics</h3>
          <ul>
            <li><strong>CAGR:</strong> {stats.cagr}%</li>
            <li><strong>Alpha:</strong> {stats.alpha}</li>
            <li><strong>Beta:</strong> {stats.beta}</li>
            <li><strong>Sharpe Ratio:</strong> {stats.sharpe}</li>
            <li><strong>Sortino Ratio:</strong> {stats.sortino}</li>
          </ul>
        </div>
      )}
      {recommendations && (
        <div>
          <h3>🧠 AI Recommendations</h3>
          <ul>
            {recommendations.map((rec, idx) => (
              <li key={idx}>
                <strong>{rec.stock}</strong>: {rec.action} ({rec.confidence}%)
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
