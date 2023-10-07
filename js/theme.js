const colorSwitch = document.getElementById("input-toggle-button");
colorSwitch.addEventListener("click", checkMode);

const btn = document.querySelector('.add-col');

function checkMode() {
  console.log("checking...");
  if (colorSwitch.checked) {
    console.log("dark on");
    darkModeOn();
    btn.style.color = "black";
    btn.addEventListener('mouseover', () => {
      btn.style.color = "white";
    })
    btn.addEventListener('mouseout', () => {
      btn.style.color = "black";
    })
  } else {
    console.log("dark off");
    darkModeOff();
    btn.style.color = "white";
    btn.addEventListener('mouseout', () => {
      btn.style.color = "white";
    })

    btn.addEventListener('mouseover', () => {
      btn.style.color = "white";
    })
  }
}

function darkModeOn() {
  document.body.classList.add("dark-mode");
}

function darkModeOff() {
  document.body.classList.remove("dark-mode");
}