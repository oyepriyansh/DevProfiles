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