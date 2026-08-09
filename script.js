document.addEventListener("DOMContentLoaded", function () {
  console.log("SNAPPLUS : script chargé");

  const form = document.getElementById("pseudoForm");

  if (!form) {
    console.log("SNAPPLUS : formulaire introuvable");
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    const pseudoInput = document.getElementById("pseudo");
    const errorMessage = document.getElementById("errorMessage");

    const pseudo = pseudoInput.value.trim();

    console.log("Pseudo reçu :", pseudo);

    if (pseudo.length < 2) {
      errorMessage.textContent =
        "Ton pseudo doit contenir au moins 2 caractères.";
      return;
    }

    errorMessage.textContent = "";

    alert("Le formulaire fonctionne !\nPseudo : " + pseudo);
  });
});
