import pandas as pd
import joblib

model = joblib.load("models/portfolio_model.pkl")

def generate_recommendations(portfolio_df):
    features = portfolio_df[['Buy Price', 'Current Price', 'Quantity']]
    preds = model.predict(features)
    probs = model.predict_proba(features)

    recommendations = []
    for i, stock in enumerate(portfolio_df['Stock']):
        label = preds[i]
        confidence = max(probs[i]) * 100
        recommendations.append({
            "stock": stock,
            "action": "Buy" if label == 1 else "Sell",
            "confidence": round(confidence, 2)
        })

    return recommendations