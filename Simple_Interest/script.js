const themeBtn = document.getElementById('themeBtn');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');

    // Optional: change theme button text based on mode
    if (document.body.classList.contains('dark')) {
        themeBtn.textContent = '☀️ Light Mode';
    } else {
        themeBtn.textContent = '🌙 Dark Mode';
    }
});

// Simple Interest Calculation
const principalInput = document.getElementById('principal');
const rateInput = document.getElementById('rate');
const timeInput = document.getElementById('time');
const interestOutput = document.getElementById('interest');
const totalOutput = document.getElementById('total');

function calculateSI() {
    const principal = parseFloat(principalInput.value);
    const rate = parseFloat(rateInput.value);
    const time = parseFloat(timeInput.value);

    if (isNaN(principal) || isNaN(rate) || isNaN(time) || principal < 0 || rate < 0 || time < 0) {
        interestOutput.textContent = "₹0.00";
        totalOutput.textContent = "₹0.00";
        return;
    }

    const interest = (principal * rate * time) / 100;
    const total = principal + interest;

    interestOutput.textContent = `₹${interest.toFixed(2)}`;
    totalOutput.textContent = `₹${total.toFixed(2)}`;
}

// Listen for input changes and calculate live
[principalInput, rateInput, timeInput].forEach(input => {
    input.addEventListener('input', calculateSI);
});

// Initialize on page load
calculateSI();