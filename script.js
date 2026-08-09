console.log("SCRIPT SNAPPLUS CHARGE");

const phoneForm = document.getElementById("phoneForm");
const pseudoForm = document.getElementById("pseudoForm");

function showStep(id) {
  document.querySelectorAll(".step").forEach((step) => {
    step.classList.remove("active");
  });

  const target = document.getElementById(id);

  if (target) {
    target.classList.add("active");
  }
}

phoneForm.addEventListener("submit", function (event) {
  event.preventDefault();

  console.log("BOUTON NUMERO CLIQUE");

  const phone = document.getElementById("phone").value.trim();
  const error = document.getElementById("phoneError");

  if (phone.length < 4) {
    error.textContent = "Entre au moins 4 caractères fictifs.";
    return;
  }

  showStep("loading");

  setTimeout(function () {
    showStep("step2");
  }, 1800);
});

pseudoForm.addEventListener("submit", function (event) {
  event.preventDefault();

  console.log("BOUTON PSEUDO CLIQUE");

  const pseudo = document.getElementById("pseudo").value.trim();
  const error = document.getElementById("pseudoError");

  if (pseudo.length < 2) {
    error.textContent = "Entre au moins 2 caractères.";
    return;
  }

  showStep("step3");
});
