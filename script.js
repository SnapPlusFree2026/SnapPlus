document.addEventListener("DOMContentLoaded", () => {
  console.log("SCRIPT SNAPPLUS CHARGÉ");

  const form = document.getElementById("pseudoForm");

  if (!form) {
    console.log("Pas de pseudoForm sur cette page.");
    return;
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    console.log("FORMULAIRE INTERCEPTÉ");

    const pseudo = document.getElementById("pseudo").value.trim();

    console.log("PSEUDO :", pseudo);

    alert("Le formulaire fonctionne. Pseudo : " + pseudo);
  });
});
