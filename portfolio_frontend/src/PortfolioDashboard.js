import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card className="col-span-1 md:col-span-2">
        <CardContent className="flex flex-col items-center gap-4 p-6">
          <UploadCloud className="w-10 h-10" />
          <input
            type="file"
            multiple
            accept=".xlsx,.pdf"
            onChange={handleFileUpload}
            className="text-center"
          />
          <Button>Upload Reports</Button>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-6 h-6" />
            <h2 className="text-xl font-bold">Portfolio Statistics</h2>
          </div>
          {stats ? (
            <ul className="space-y-2">
              <li><strong>CAGR:</strong> {stats.cagr}%</li>
              <li><strong>Alpha:</strong> {stats.alpha}</li>
              <li><strong>Beta:</strong> {stats.beta}</li>
              <li><strong>Sharpe Ratio:</strong> {stats.sharpe}</li>
              <li><strong>Sortino Ratio:</strong> {stats.sortino}</li>
            </ul>
          ) : (
            <p className="text-muted-foreground">Upload reports to view stats.</p>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <BrainCircuit className="w-6 h-6" />
            <h2 className="text-xl font-bold">AI Recommendations</h2>
          </div>
          {recommendations ? (
            <ul className="space-y-2">
              {recommendations.map((rec, idx) => (
                <li key={idx}>
                  <strong>{rec.stock}</strong>: {rec.action} ({rec.confidence}%)
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted-foreground">No recommendations yet.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
