// Create animated background particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (Math.random() * 3 + 3) + 's';
        particlesContainer.appendChild(particle);
    }
}

// Toggle apps dropdown
function toggleApps() {
    const dropdown = document.getElementById('appsDropdown');
    const profileDropdown = document.getElementById('profileDropdown');

    profileDropdown.classList.add('hidden');
    dropdown.classList.toggle('hidden');
    dropdown.classList.toggle('show');
}

// Toggle profile dropdown
function toggleProfile() {
    const dropdown = document.getElementById('profileDropdown');
    const appsDropdown = document.getElementById('appsDropdown');

    appsDropdown.classList.add('hidden');
    dropdown.classList.toggle('hidden');
    dropdown.classList.toggle('show');
}

// Handle search
function handleSearch(event) {
    if (event) event.preventDefault();

    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank');
    }
}

// Handle "I'm Feeling Lucky"
function handleLucky() {
    const query = document.getElementById('searchInput').value.trim();
    if (query) {
        window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}&btnI=I'm+Feeling+Lucky`, '_blank');
    } else {
        // Random search if no query
        const randomSearches = ['beautiful landscapes', 'amazing facts', 'inspiring quotes', 'cool technology', 'space exploration'];
        const randomQuery = randomSearches[Math.floor(Math.random() * randomSearches.length)];
        window.open(`https://www.google.com/search?q=${encodeURIComponent(randomQuery)}&btnI=I'm+Feeling+Lucky`, '_blank');
    }
}

// Handle voice search (placeholder)
function handleVoiceSearch() {
    alert('Voice search would be implemented here with Web Speech API');
}

// Handle image search (placeholder)
function handleImageSearch() {
    window.open('https://images.google.com', '_blank');
}

// Close dropdowns when clicking outside
document.addEventListener('click', function (event) {
    const appsDropdown = document.getElementById('appsDropdown');
    const profileDropdown = document.getElementById('profileDropdown');

    if (!event.target.closest('.apps-btn') && !event.target.closest('#appsDropdown')) {
        appsDropdown.classList.add('hidden');
        appsDropdown.classList.remove('show');
    }

    if (!event.target.closest('.profile-btn') && !event.target.closest('#profileDropdown')) {
        profileDropdown.classList.add('hidden');
        profileDropdown.classList.remove('show');
    }
});

// Handle Enter key in search input
document.getElementById('searchInput').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        handleSearch(event);
    }
});

// Initialize particles on page load
document.addEventListener('DOMContentLoaded', function () {
    createParticles();
});

// Add some interactive effects
document.addEventListener('mousemove', function (e) {
    const particles = document.querySelectorAll('.particle');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    particles.forEach((particle, index) => {
        const speed = (index % 5 + 1) * 0.5;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;
        particle.style.transform = `translate(${x}px, ${y}px)`;
    });
});