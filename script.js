```js
const phoneForm = document.getElementById("phoneForm");
const pseudoForm = document.getElementById("pseudoForm");

const phoneInput = document.getElementById("phone");
const pseudoInput = document.getElementById("pseudo");

const phoneError = document.getElementById("phoneError");
const pseudoError = document.getElementById("pseudoError");

function showStep(id) {
  document.querySelectorAll(".step").forEach((step) => {
    step.classList.remove("active");
  });

  document.getElementById(id).classList.add("active");
}


// NUMÉRO FICTIF
phoneForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const phone = phoneInput.value.trim();

  phoneError.textContent = "";

  if (phone.length < 4) {
    phoneError.textContent =
      "Entre un numéro fictif pour continuer.";
    return;
  }

  const button = phoneForm.querySelector("button");
  const text = button.querySelector("span");

  button.disabled = true;
  text.textContent = "Chargement…";

  showStep("loading");

  setTimeout(() => {
    showStep("step2");
  }, 1800);
});


// PSEUDO
pseudoForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const pseudo = pseudoInput.value.trim();

  pseudoError.textContent = "";

  if (pseudo.length < 2) {
    pseudoError.textContent =
      "Ton pseudo doit contenir au moins 2 caractères.";
    return;
  }

  const button = pseudoForm.querySelector("button");
  const text = button.querySelector("span");

  button.disabled = true;
  text.textContent = "Terminé…";

  setTimeout(() => {
    showStep("step3");
  }, 700);
});
```
