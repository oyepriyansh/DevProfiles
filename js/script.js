const searchInput = document.getElementById('searchInput');
const profiles = document.querySelectorAll('.profile');
const noProfileDiv = document.getElementById('no-profile');
searchInput.addEventListener('input', filterProfiles);

function filterProfiles() {
    const query = searchInput.value.toLowerCase();
    let hasMatchingProfile = false;
    profiles.forEach((profile) => {
        const name = profile.querySelector('.name').textContent.toLowerCase();
        const skills = profile.querySelector('.skills').textContent.toLowerCase();
        if (name.includes(query) || skills.includes(query)) {
          hasMatchingProfile = true;
          profile.style.display = 'block'; // Show matching profiles
        } else {
            profile.style.display = 'none'; // Hide non-matching profiles
        }
    });
    if (hasMatchingProfile) {
      noProfileDiv.style.display = 'none';
    } else {
      noProfileDiv.style.display = 'block';
    }

}


// Light and dark mode implementetion

const colorSwitch = document.getElementById("input-toggle-button");
colorSwitch.addEventListener("click", checkMode);

const btn = document.querySelector('.add-col');

function checkMode() {
  console.log("checking...");
  if (colorSwitch.checked) {
    console.log("dark on");
    darkModeOn();
    btn.addEventListener('mouseover', () => {
      btn.style.color = "white";
    })
    btn.addEventListener('mouseout', () => {
      btn.style.color = "black";
    })
  } else {
    console.log("dark off");
    darkModeOff();
  }
}

function darkModeOn() {
  document.body.classList.add("dark-mode");
}

function darkModeOff() {
  document.body.classList.remove("dark-mode");
}