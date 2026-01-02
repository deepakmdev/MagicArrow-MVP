let currentStep = 0;
let steps = []; // Will be loaded from textarea

// Start guide by reading user-provided steps
function startGuide() {
  try {
    const input = document.getElementById("chatStepsInput").value;
    steps = JSON.parse(input);
    if (!Array.isArray(steps) || steps.length === 0) {
      alert("Please enter valid steps in JSON format!");
      return;
    }
    currentStep = 0;
    showStep(currentStep);
  } catch (err) {
    alert("Invalid JSON! Check your steps format.");
  }
}

// Show current step
function showStep(index) {
  document.querySelectorAll(".highlight").forEach(el => {
    el.classList.remove("highlight");
  });

  const step = steps[index];
  const element = document.querySelector(step.target);
  if (!element) {
    alert("Target element not found: " + step.target);
    return;
  }
  const rect = element.getBoundingClientRect();

  // Move arrow
  const arrow = document.getElementById("arrow");
  arrow.style.top = rect.top + window.scrollY + "px";
  arrow.style.left = rect.left + window.scrollX - 30 + "px";

  // Highlight element
  element.classList.add("highlight");

  // Move backpack
  const backpack = document.getElementById("backpack");
  backpack.style.top = rect.top + window.scrollY + 40 + "px";
  backpack.style.left = rect.left + window.scrollX + "px";
  backpack.style.display = "block";

  // Update instruction text
  document.getElementById("instructionText").innerText = step.text;
}

// Go to next step
function nextStep() {
  currentStep++;
  if (currentStep < steps.length) {
    showStep(currentStep);
  } else {
    document.getElementById("backpack").style.display = "none";
    alert("Guide completed!");
  }
}

// Attach event listener
document.getElementById("startGuideBtn").addEventListener("click", startGuide);
