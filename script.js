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
  submitButton.querySelector(".button-text").textContent = "Envoi…";
  pseudoInput.disabled = true;

  /*
   * Aucun webhook réel n'est utilisé ici.
   *
   * GitHub Pages étant un hébergement statique, un webhook privé
   * ne doit jamais être placé directement dans le JavaScript public.
   *
   * Cette simulation permet de tester le parcours utilisateur
   * sans transmettre de donnée à un service externe.
   */
  const isTestWebhook =
    DISCORD_WEBHOOK === "TON_WEBHOOK_DE_TEST_ICI";

  try {
    if (isTestWebhook) {
      await new Promise((resolve) => {
        setTimeout(resolve, 700);
      });
    }

    window.location.href = "success.html";
  } catch (error) {
    console.error("Erreur lors du traitement :", error);

    errorMessage.textContent =
      "Une erreur est survenue. Réessaie.";

    submitButton.disabled = false;
    submitButton.querySelector(".button-text").textContent =
      "Continuer →";

    pseudoInput.disabled = false;
    pseudoInput.focus();
  }
});
