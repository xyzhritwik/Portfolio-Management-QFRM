from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import os
from utils.parser import parse_reports
from utils.stats import calculate_portfolio_stats
from utils.ml_model import generate_recommendations

app = Flask(__name__)
CORS(app)
@app.route("/")
def index():
    return "Portfolio Backend is Live 🎯"


@app.route("/upload", methods=["POST"])
def upload_reports():
    files = request.files.getlist("files")
    if not files:
        return jsonify({"error": "No files uploaded"}), 400

    try:
        # Dummy test response for now
        return jsonify({
            "stats": {
                "cagr": 12.34,
                "alpha": 0.15,
                "beta": 1.02,
                "sharpe": 1.25,
                "sortino": 1.60
            },
            "recommendations": [
                {"stock": "HDFCBANK", "action": "Buy", "confidence": 91.5},
                {"stock": "ICICI", "action": "Sell", "confidence": 78.3}
            ]
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    os.makedirs("temp", exist_ok=True)
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
