document.getElementById('themeSelector').addEventListener('change', (e) => {
  document.body.className = e.target.value;
});

// Credential Manager
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const date = document.getElementById('date');
const password = document.getElementById('password');

const savedEmail = document.getElementById('savedEmail');
const savedPhone = document.getElementById('savedPhone');
const savedDate = document.getElementById('savedDate');
const savedPassword = document.getElementById('savedPassword');
const savedSection = document.getElementById('savedSection');

const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const dateError = document.getElementById('dateError');
const passwordError = document.getElementById('passwordError');

document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();

  emailError.textContent = '';
  phoneError.textContent = '';
  dateError.textContent = '';
  passwordError.textContent = '';

  if (!email.value.includes('@')) {
    emailError.textContent = 'Invalid email';
    return;
  }

  if (!/^\+?[0-9\s\-]{7,15}$/.test(phone.value)) {
    phoneError.textContent = 'Invalid phone number';
    return;
  }

  if (!date.value) {
    dateError.textContent = 'Date is required';
    return;
  }

  if (password.value.length < 4) {
    passwordError.textContent = 'Too short';
    return;
  }

  localStorage.setItem('email', email.value);
  localStorage.setItem('phone', phone.value);
  localStorage.setItem('date', date.value);
  localStorage.setItem('password', password.value);

  savedEmail.textContent = email.value;
  savedPhone.textContent = phone.value;
  savedDate.textContent = date.value;
  savedPassword.textContent = password.value;

  savedSection.classList.remove('hidden');
});

document.getElementById('deleteData').addEventListener('click', () => {
  localStorage.removeItem('email');
  localStorage.removeItem('phone');
  localStorage.removeItem('date');
  localStorage.removeItem('password');
  savedSection.classList.add('hidden');
});

if (localStorage.getItem('email') && localStorage.getItem('password')) {
  savedEmail.textContent = localStorage.getItem('email');
  savedPhone.textContent = localStorage.getItem('phone');
  savedDate.textContent = localStorage.getItem('date');
  savedPassword.textContent = localStorage.getItem('password');
  savedSection.classList.remove('hidden');
}

document.getElementById('togglePassword').addEventListener('click', () => {
  password.type = password.type === 'password' ? 'text' : 'password';
});

// Task Manager
const taskInput = document.getElementById('taskInput');
const taskCategory = document.getElementById('taskCategory');
const taskList = document.getElementById('taskList');
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

function renderTasks(filter = 'all') {
  taskList.innerHTML = '';
  tasks.filter(t => {
    if (filter === 'all') return true;
    if (filter === 'active') return !t.completed;
    if (filter === 'completed') return t.completed;
  }).forEach((t, i) => {
    const li = document.createElement('li');
    li.className = t.completed ? 'completed' : '';
    li.innerHTML = `
        <span>${t.text} (${t.category})</span>
        <div>
          <button onclick="toggleComplete(${i})">✔️</button>
          <button onclick="deleteTask(${i})">❌</button>
        </div>
      `;
    taskList.appendChild(li);
  });
}

function toggleComplete(i) {
  tasks[i].completed = !tasks[i].completed;
  saveTasks();
}

function deleteTask(i) {
  tasks.splice(i, 1);
  saveTasks();
}

function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
  const activeFilter = document.querySelector('.filters button.active').dataset.filter;
  renderTasks(activeFilter);
}

document.getElementById('taskForm').addEventListener('submit', (e) => {
  e.preventDefault();
  tasks.push({ text: taskInput.value, category: taskCategory.value, completed: false });
  taskInput.value = '';
  saveTasks();
});

document.querySelectorAll('.filters button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filters button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderTasks(btn.dataset.filter);
  });
});
renderTasks();
