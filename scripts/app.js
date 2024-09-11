// Redirect if the URL contains an empty search query
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('search') && urlParams.get('search').trim() === '') {
  window.location.href = '/'; // Redirect to the root URL if search parameter is empty
}

const container = document.querySelector('.container');
const defaultImage = "https://oyepriyansh.pages.dev/i/5nf5fd.png";
const searchInput = document.getElementById('searchInput'); // Assuming there's an input field for searching
const noProfileMessage = document.querySelector('.no-profile'); // Message element
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
    noProfileMessage.style.display = 'block'; // Show error message
  }
};

// Display profiles on the page
const displayProfiles = async (profiles) => {
  container.innerHTML = ''; // Clear existing profiles
  for (const profile of profiles) {
    const profileDiv = document.createElement('div');
    profileDiv.classList.add('profile');

    // Determine the image source
    let imageSrc = profile.image || await fetchGitHubImage(profile.github);

    // Skills
    const skills = profile.skills.map(skill => `<span class="skill">${skill}</span>`).join('');

    // Social links with improved accessibility
    const social = `
      ${profile.github ? `<a href="${profile.github}" target="_blank" aria-label="${profile.name}'s GitHub Profile"><i class="fa-brands fa-github"></i></a>` : ''}
      ${profile.twitter ? `<a href="${profile.twitter}" target="_blank" aria-label="${profile.name}'s Twitter Profile"><i class="fa-brands fa-x-twitter"></i></a>` : ''}
      ${profile.linkedin ? `<a href="${profile.linkedin}" target="_blank" aria-label="${profile.name}'s LinkedIn Profile"><i class="fa-brands fa-linkedin-in"></i></a>` : ''}
    `;

    // Adding profile HTML content
    profileDiv.innerHTML = `
      <div class="pfp">
        <img src="${imageSrc}" alt="${profile.name}'s Profile Picture" onerror="this.onerror=null; this.src='${defaultImage}';" />
      </div>
      <h2 class="name">${profile.name}</h2>
      <div class="skills">${skills}</div>
      <div class="social">${social}</div>
    `;

    container.append(profileDiv);
  }
};

// Function to fetch GitHub image
const fetchGitHubImage = async (githubUrl) => {
  if (!githubUrl) return defaultImage; // Return default if no GitHub URL

  // Extract username from GitHub URL
  const username = githubUrl.split('/').pop();
  const apiUrl = `https://api.github.com/users/${username}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error('GitHub user not found');
    }
    const userData = await response.json();
    return userData.avatar_url || defaultImage; // Return avatar URL or default image
  } catch (error) {
    console.error('Error fetching GitHub image:', error);
    return defaultImage; // Fallback to default image on error
  }
};

// Shuffle array function
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Search function with debouncing and URL update
let debounceTimer;
searchInput.addEventListener('keyup', () => {
  clearTimeout(debounceTimer);
  const searchTerm = searchInput.value.trim().toLowerCase();

  debounceTimer = setTimeout(() => {
    updateURL(searchTerm); // Update the URL with the search term
    filterProfiles(searchTerm);
  }, 300); // 300ms debounce time
});

// Function to update the URL
const updateURL = (searchTerm) => {
  const url = new URL(window.location);
  url.searchParams.set('search', searchTerm);
  window.history.pushState({}, '', url);
};

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

  // Show or hide the no profiles message based on search results
  noProfileMessage.style.display = (visibleProfiles === 0 && searchTerm !== '') ? 'block' : 'none'; // Show message if no profiles found
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

// Load search term from URL on page load
const searchTerm = urlParams.get('search') || '';
searchInput.value = searchTerm; // Set the input value from the URL
filterProfiles(searchTerm); // Filter profiles based on the URL search term
