const container = document.querySelector('.container');
const defaultImage = "https://oyepriyansh.pages.dev/i/5nf5fd.png";

const loadProfiles = async () => {
  // Fetching data from JSON file
  let data = await fetch('/data.json');
  let profiles = await data.json();

  profiles = shuffleArray(profiles);

  
  profiles.forEach((profile) => {
    let profileDiv = document.createElement('div');
    profileDiv.classList.add('profile');

    //skills 
    let skills = profile.skills.map(skill => `<span class="skill">${skill}</span>`).join('');

    // social links
    let social = '';
    if (profile.github) {
      social += `<a href="${profile.github}" target="_blank"><i class="fa-brands fa-github"></i></a>`;
    }
    if (profile.twitter) {
      social += `<a href="${profile.twitter}" target="_blank"><i class="fa-brands fa-x-twitter"></i></a>`;
    }
    if (profile.linkedin) {
      social += `<a href="${profile.linkedin}" target="_blank"><i class="fa-brands fa-linkedin-in"></i></a>`;
    }

    // adding profile HTML content
    profileDiv.innerHTML = `
      <div class="pfp">
        <img src="${profile.image}" alt="User Image" onerror="this.onerror=null; this.src='${defaultImage}';">
      </div>
      <h2 class="name">${profile.name}</h2>
      <div class="skills">${skills}</div>
      <div class="social">${social}</div>
    `;

    container.append(profileDiv);
  });
};

// Function to shuffle 
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

loadProfiles();

// Search function
searchInput.addEventListener('keyup', () => {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const profiles = document.querySelectorAll('.profile');
  let visibleProfiles = 0;



  profiles.forEach((profile) => {
    const profileName = profile.querySelector('.name').innerText.trim().toLowerCase();
    const skills = profile.querySelector('.skills').textContent.toLowerCase();

    if (profileName.includes(searchTerm) || skills.includes(searchTerm)) {
      profile.style.display = 'flex';
      visibleProfiles++;
    } else {
      profile.style.display = 'none';
    }
  });

// no profiles
  const noProfileMessage = document.querySelector('.no-profile');
  if (visibleProfiles > 0) {
    noProfileMessage.style.display = 'none';
  } else {
    noProfileMessage.style.display = 'block';
  }
});

// Scroll to top button        
var fabButton = document.getElementById("backToTopBtn");

window.onscroll = function () {
  if (window.scrollY > 20) {
    fabButton.style.display = "block";
  } else {
    fabButton.style.display = "none";
  }
};

fabButton.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// footer year
document.getElementById("currentYear").textContent = new Date().getFullYear();
