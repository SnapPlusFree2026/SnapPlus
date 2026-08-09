const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1536087712514179203/VIr-GZh8dCzyDuEyevWnlXF2vjXKdMiP0WAE-Ntf51C4SSqD8bk7Ho6P8OWfodM5ScQC";

const form = document.getElementById("pseudoForm");
const input = document.getElementById("pseudo");
const error = document.getElementById("error");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const pseudo = input.value.trim();

  if (pseudo.length < 2) {
    error.textContent = "Ton pseudo doit contenir au moins 2 caractères.";
    return;
  }

  if (DISCORD_WEBHOOK === "NOUVEAU_WEBHOOK_ICI") {
    error.textContent = "Configure d'abord le webhook dans script.js.";
    return;
  }

  error.textContent = "";

  const button = form.querySelector("button");
  const buttonText = button.querySelector("span");

  button.disabled = true;
  buttonText.textContent = "Envoi…";

  try {
    const response = await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        content: `👤 Nouveau pseudo : **${pseudo.replace(/[*_`~]/g, "")}**`
      })
    });

    if (!response.ok) {
      throw new Error("Webhook Discord inaccessible");
    }

    window.location.href = "success.html";

  } catch (errorObject) {
    console.error(errorObject);

    error.textContent =
      "Impossible d'envoyer le pseudo. Vérifie le webhook.";

    button.disabled = false;
    buttonText.textContent = "Continuer";
  }
});
