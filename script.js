```js
function showStep(number) {
  document.querySelectorAll(".step").forEach((step) => {
    step.classList.remove("active");
  });

  document
    .getElementById("step" + number)
    .classList.add("active");
}

function nextStep(number) {
  if (number === 2) {
    const phone = document.getElementById("phone").value.trim();

    if (phone.length < 4) {
      alert("Entre un numéro fictif pour continuer.");
      return;
    }

    showStep(2);

    setTimeout(() => {
      showStep(3);
    }, 1800);

    return;
  }

  if (number === 4) {
    const pseudo = document.getElementById("pseudo").value.trim();

    if (pseudo.length < 2) {
      alert("Entre un pseudo fictif.");
      return;
    }

    showStep(4);
  }
}

function finishDemo() {
  const code = document.getElementById("demoCode").value.trim();

  if (code.length < 1) {
    alert("Entre quelque chose dans le champ de démonstration.");
    return;
  }

  showStep(5);
}
```
