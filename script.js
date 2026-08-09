
document.addEventListener("DOMContentLoaded", function () {

  // ==========================================
  // ÉTAPE 1 — PSEUDO
  // ==========================================

  const pseudoForm = document.getElementById("pseudoForm");

  if (pseudoForm) {

    const pseudoInput = document.getElementById("pseudo");
    const errorMessage = document.getElementById("errorMessage");
    const submitButton = document.getElementById("submitButton");
    const buttonText = submitButton.querySelector(".button-text");

    pseudoForm.addEventListener("submit", function (event) {

      event.preventDefault();

      const pseudo = pseudoInput.value.trim();

      errorMessage.textContent = "";

      if (pseudo.length < 2) {
        errorMessage.textContent =
          "Ton pseudo doit contenir au moins 2 caractères.";
        pseudoInput.focus();
        return;
      }

      if (pseudo.length > 32) {
        errorMessage.textContent =
          "Ton pseudo ne peut pas dépasser 32 caractères.";
        pseudoInput.focus();
        return;
      }

      sessionStorage.setItem("snapplus_pseudo", pseudo);

      submitButton.disabled = true;
      buttonText.textContent = "Continuer…";

      window.location.href = "verification.html";
    });
  }


  // ==========================================
  // ÉTAPE 2 — CONFIRMATION
  // ==========================================

  const verificationForm =
    document.getElementById("verificationForm");

  if (verificationForm) {

    const firstPart =
      document.getElementById("firstPart");

    const secondPart =
      document.getElementById("secondPart");

    const errorMessage =
      document.getElementById("verificationError");

    const button =
      document.getElementById("verificationButton");

    const buttonText =
      button.querySelector(".button-text");

    verificationForm.addEventListener(
      "submit",
      function (event) {

        event.preventDefault();

        const first = firstPart.value.trim();
        const second = secondPart.value.trim();

        errorMessage.textContent = "";

        if (!first || !second) {
          errorMessage.textContent =
            "Remplis les deux parties du pseudo.";
          return;
        }

        button.disabled = true;
        firstPart.disabled = true;
        secondPart.disabled = true;

        buttonText.textContent = "Confirmation…";

        /*
         * Pour le moment, aucune donnée n'est envoyée
         * à un service externe.
         */

        console.log("Première partie :", first);
        console.log("Deuxième partie :", second);

        setTimeout(function () {
          window.location.href = "success.html";
        }, 500);
      }
    );
  }

});
```
