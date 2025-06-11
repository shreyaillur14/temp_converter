// Get DOM elements
const textBox = document.getElementById("textBox");
const toFahrenheit = document.getElementById("toFahrenheit");
const toCelsius = document.getElementById("toCelsius");
const toKelvin = document.getElementById("toKelvin");
const fromKelvin = document.getElementById("fromKelvin");
const result = document.getElementById("result");
const formula = document.getElementById("formula");
const convertBtn = document.getElementById("convertBtn");

// Input validation helper
function validateInput(value) {
    if (isNaN(value) || value === "") {
        return false;
    }
    
    // Additional validation for Kelvin (can't be negative)
    if (fromKelvin.checked && value < 0) {
        result.textContent = "Kelvin cannot be negative";
        formula.textContent = "";
        return false;
    }
    
    return true;
}

// Main conversion function
function convert() {
    // Clear previous result
    formula.textContent = "";
    
    // Get and validate input
    const inputValue = Number(textBox.value);
    
    if (!validateInput(inputValue)) {
        result.textContent = "Please enter a valid number";
        return;
    }
    
    let temp, formulaText;
    
    // Perform the appropriate conversion
    if (toFahrenheit.checked) {
        temp = inputValue * 9/5 + 32;
        result.textContent = temp.toFixed(1) + "°F";
        formulaText = `${inputValue}°C × (9/5) + 32 = ${temp.toFixed(1)}°F`;
    } 
    else if (toCelsius.checked) {
        temp = (inputValue - 32) * (5/9);
        result.textContent = temp.toFixed(1) + "°C";
        formulaText = `(${inputValue}°F - 32) × (5/9) = ${temp.toFixed(1)}°C`;
    }
    else if (toKelvin.checked) {
        temp = inputValue + 273.15;
        result.textContent = temp.toFixed(2) + "K";
        formulaText = `${inputValue}°C + 273.15 = ${temp.toFixed(2)}K`;
    }
    else if (fromKelvin.checked) {
        temp = inputValue - 273.15;
        result.textContent = temp.toFixed(2) + "°C";
        formulaText = `${inputValue}K - 273.15 = ${temp.toFixed(2)}°C`;
    }
    else {
        result.textContent = "Select a unit";
        return;
    }
    
    // Display the formula used
    formula.textContent = formulaText;
    
    // Add animation effect to result
    result.style.animation = "none";
    setTimeout(() => {
        result.style.animation = "fadeIn 0.5s";
    }, 10);
}

// Event listeners
convertBtn.addEventListener("click", convert);

// Allow Enter key to trigger conversion
textBox.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        convert();
    }
});

// Initialize with a default checked option
toFahrenheit.checked = true;

// CSS animation for the result
document.head.insertAdjacentHTML("beforeend", `
<style>
@keyframes fadeIn {
    from { opacity: 0; transform: translateY(-10px); }
    to { opacity: 1; transform: translateY(0); }
}
</style>
`);