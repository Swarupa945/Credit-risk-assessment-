# 🛡️ CredGuard — Next-gen Credit Risk Intelligence

CredGuard is a production-ready machine learning web application built with **FastAPI**, **Scikit-Learn**, and a modern **Neo-Banking UI**. It evaluates customer loan applications in real-time, predicting default probability against an optimized classification threshold.

---

## 🚀 Features

* **Real-Time Risk Scoring:** Instantly calculates default probability using a trained machine learning pipeline and custom classification threshold.
* **Modern Fintech UI:** Features a gorgeous, responsive frontend built with vanilla HTML, CSS (Plus Jakarta Sans, smooth CSS variables, background glows), and JavaScript.
* **Interactive Feedback:** Dynamic progress bars, status badges (`High Risk` vs `Low Risk / Approved`), and smooth fade-in animations.
* **High-Performance Backend:** Powered by FastAPI with asynchronous lifespan management for loading pickled ML artifacts (`joblib`).
* **Cloud-Ready:** Pre-configured with a `render.yaml` blueprint and a `runtime.txt` for effortless deployment on Render.

---

## 📂 Project Structure

```text
CreditRiskProject/
│
├── main.py                  # FastAPI backend server & model prediction endpoints
├── credit_risk_model.pkl    # Trained Scikit-Learn classification model
├── best_threshold.pkl       # Optimized classification threshold value
├── requirements.txt         # Python dependencies
├── runtime.txt              # Python runtime version for cloud deployment
├── render.yaml              # Render infrastructure-as-code deployment blueprint
│
└── static/                  # Frontend assets served directly by FastAPI
    ├── index.html           # UI Markup
    ├── style.css            # Styling and animations
    └── script.js            # Frontend form handling and API communication
