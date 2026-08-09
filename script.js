// ===============================
// CONFIGURATION
// ===============================
// Colle ton webhook Discord entre les guillemets.
// Attention : dans cette version statique, le webhook sera visible
// dans le code du site. Ne l'utilise pas pour un webhook important.
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

  if (DISCORD_WEBHOOK === "https://discord.com/api/webhooks/1536087712514179203/VIr-GZh8dCzyDuEyevWnlXF2vjXKdMiP0WAE-Ntf51C4SSqD8bk7Ho6P8OWfodM5ScQC") {
    error.textContent = "Configure d'abord le webhook dans script.js.";
    return;
  }

  error.textContent = "";

  const button = form.querySelector("button");
  button.disabled = true;
  button.querySelector("span").textContent = "Envoi…";

  try {
    await fetch(DISCORD_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: `👤 Nouveau pseudo : **${pseudo.replace(/[*_`~]/g, "")}**`
      }),
      mode: "cors"
    });

    window.location.href = "success.html";
  } catch (e) {
    error.textContent = "Impossible d'envoyer le pseudo. Vérifie le webhook.";
    button.disabled = false;
    button.querySelector("span").textContent = "Continuer";
  }
});
