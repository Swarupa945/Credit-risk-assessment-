const API_URL = "http://127.0.0.1:8000"; // <-- Change this // Change this to your deployed Render URL once live

const loanForm = document.getElementById("loanForm");
const submitBtn = document.getElementById("submitBtn");
const btnLoader = document.getElementById("btnLoader");
const resultSection = document.getElementById("resultSection");
const resultBadge = document.getElementById("resultBadge");
const probValue = document.getElementById("probValue");
const thresholdValue = document.getElementById("thresholdValue");
const progressBarFill = document.getElementById("progressBarFill");

loanForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Collect Form Data & convert types
    const formData = {
        person_age: parseInt(document.getElementById("person_age").value),
        person_income: parseFloat(document.getElementById("person_income").value),
        person_home_ownership: document.getElementById("person_home_ownership").value,
        person_emp_length: parseFloat(document.getElementById("person_emp_length").value),
        loan_intent: document.getElementById("loan_intent").value,
        loan_grade: document.getElementById("loan_grade").value,
        loan_amnt: parseFloat(document.getElementById("loan_amnt").value),
        loan_int_rate: parseFloat(document.getElementById("loan_int_rate").value),
        loan_percent_income: parseFloat(document.getElementById("loan_percent_income").value),
        cb_person_default_on_file: document.getElementById("cb_person_default_on_file").value,
        cb_person_cred_hist_length: parseInt(document.getElementById("cb_person_cred_hist_length").value)
    };

    // UI Loading state
    submitBtn.disabled = true;
    btnLoader.style.display = "block";
    submitBtn.querySelector("span").textContent = "Analyzing...";

    try {
        const response = await fetch(`${API_URL}/predict`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error("Failed to fetch prediction from server.");
        }

        const result = await response.json();
        displayResult(result);

    } catch (error) {
        alert("Error connecting to backend API: " + error.message);
    } finally {
        // Reset button state
        submitBtn.disabled = false;
        btnLoader.style.display = "none";
        submitBtn.querySelector("span").textContent = "Evaluate Risk";
    }
});

function displayResult(data) {
    resultSection.classList.remove("hidden");
    
    const probabilityPercent = (data.default_probability * 100).toFixed(2);
    probValue.textContent = `${probabilityPercent}%`;
    thresholdValue.textContent = data.threshold.toFixed(2);

    // Style Badge & Progress Fill
    if (data.Result === "High Risk") {
        resultBadge.textContent = "High Risk of Default";
        resultBadge.className = "result-badge high";
        progressBarFill.style.backgroundColor = "var(--danger)";
    } else {
        resultBadge.textContent = "Low Risk / Approved";
        resultBadge.className = "result-badge low";
        progressBarFill.style.backgroundColor = "var(--success)";
    }

    // Animate progress bar width
    setTimeout(() => {
        progressBarFill.style.width = `${Math.min(probabilityPercent, 100)}%`;
    }, 100);

    // Smooth scroll to results
    resultSection.scrollIntoView({ behavior: "smooth" });
}