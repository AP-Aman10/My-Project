document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('form');
  const emailInput = form.querySelector('input[type="email"]');
  const passwordInput = form.querySelector('input[type="password"]');
  const rememberCheckbox = form.querySelector('input[type="checkbox"]');
  const feedback = createFeedbackContainer(form);

  // Load remembered email
  if (localStorage.getItem('rememberedEmail')) {
    emailInput.value = localStorage.getItem('rememberedEmail');
    rememberCheckbox.checked = true;
  }

  // Add show/hide password toggle
  createPasswordToggle(passwordInput);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    clearFeedback();

    const email = emailInput.value.trim();
    const password = passwordInput.value;

    if (!isValidEmail(email)) {
      showFeedback("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      showFeedback("Password must be at least 6 characters.");
      return;
    }

    // Store or clear email in localStorage
    if (rememberCheckbox.checked) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }

    // Success message
    showFeedback(`Welcome, ${email}!`, true);

    // Redirect after short delay
    setTimeout(() => {
      if (email === 'amanpatidar812@gmail.com' && password === 'BadgeP@18') {
        window.location.href = 'https://www.youtube.com/'
      }
      else if (email === 'amanpatidar812@gmail.com' && password === 'KnightP@18') {
        window.location.href = 'https://www.instagram.com/?utm_source=pwa_homescreen&__pwa=1'
      }
      else {
        window.location.href = 'https://github.com/';
      }
    }, 1500); // delay to show feedback

    form.reset();
  });

  // Utility Functions

  function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  function createFeedbackContainer(form) {
    const div = document.createElement('div');
    div.className = 'feedback';
    div.style.cssText = 'margin-top: 15px; text-align: center;';
    form.appendChild(div);
    return div;
  }

  function showFeedback(message, isSuccess = false) {
    feedback.textContent = message;
    feedback.style.color = isSuccess ? 'lightgreen' : 'tomato';
  }

  function clearFeedback() {
    feedback.textContent = '';
  }

  function createPasswordToggle(input) {
    const toggle = document.createElement('span');
    toggle.innerHTML = '👁️';
    toggle.title = 'Show/Hide Password';
    toggle.style.cssText = `
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      cursor: pointer;
      font-size: 1.2em;
    `;

    input.parentNode.style.position = 'relative';
    input.parentNode.appendChild(toggle);

    toggle.addEventListener('click', () => {
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      toggle.innerHTML = isPassword ? '🙈' : '👁️';
    });
  }
});
