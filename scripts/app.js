const container = document.querySelector('.container');
const defaultImage = "https://oyepriyansh.pages.dev/i/5nf5fd.png";
const searchInput = document.getElementById('searchInput'); // Assuming there's an input field for searching
const noProfileMessage = document.querySelector('.no-profile');
const fabButton = document.getElementById("backToTopBtn");

// Load profiles from JSON file
const loadProfiles = async () => {
  try {
    const response = await fetch('/data.json');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const profiles = await response.json();
    displayProfiles(shuffleArray(profiles));
  } catch (error) {
    console.error('Error fetching profiles:', error);
    noProfileMessage.textContent = 'Failed to load profiles. Please try again later.';
    noProfileMessage.style.display = 'block';
  }
};

// Display profiles on the page
const displayProfiles = (profiles) => {
  profiles.forEach((profile) => {
    const profileDiv = document.createElement('div');
    profileDiv.classList.add('profile');

    // Skills
    const skills = profile.skills.map(skill => `<span class="skill">${skill}</span>`).join('');

    // Social links
    const social = `
      ${profile.github ? `<a href="${profile.github}" target="_blank" aria-label="GitHub"><i class="fa-brands fa-github"></i></a>` : ''}
      ${profile.twitter ? `<a href="${profile.twitter}" target="_blank" aria-label="Twitter"><i class="fa-brands fa-x-twitter"></i></a>` : ''}
      ${profile.linkedin ? `<a href="${profile.linkedin}" target="_blank" aria-label="LinkedIn"><i class="fa-brands fa-linkedin-in"></i></a>` : ''}
    `;

    // Adding profile HTML content
    profileDiv.innerHTML = `
      <div class="pfp">
        <img src="${profile.image}" alt="${profile.name}'s Profile Picture" onerror="this.onerror=null; this.src='${defaultImage}';" />
      </div>
      <h2 class="name">${profile.name}</h2>
      <div class="skills">${skills}</div>
      <div class="social">${social}</div>
    `;

    container.append(profileDiv);
  });
};

// Shuffle array function
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Search function with debouncing
let debounceTimer;
searchInput.addEventListener('keyup', () => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    filterProfiles(searchTerm);
  }, 300); // 300ms debounce time
});

// Filter profiles based on search term
const filterProfiles = (searchTerm) => {
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

  // Show or hide the no profiles message
  noProfileMessage.style.display = visibleProfiles > 0 ? 'none' : 'block';
};

// Scroll to top button functionality
window.onscroll = function () {
  fabButton.style.display = window.scrollY > 20 ? "block" : "none";
};

fabButton.addEventListener("click", function () {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// Footer year display
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Load profiles when the page is ready
loadProfiles();
