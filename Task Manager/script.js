const plannerEl = document.getElementById('planner');
const currentHour = new Date().getHours();
const hours = [...Array(9).keys()].map(i => i + 9); // 9AM–5PM

function loadPlans() {
  return JSON.parse(localStorage.getItem('plans')) || {};
}

function savePlans(plans) {
  localStorage.setItem('plans', JSON.stringify(plans));
}

function renderPlanner() {
  const plans = loadPlans();

  hours.forEach(hour => {
    const timeBlock = document.createElement('div');
    timeBlock.className = 'time-block';

    const label = document.createElement('div');
    label.className = 'hour';
    label.textContent = formatHour(hour);

    const textArea = document.createElement('textarea');
    textArea.className = 'text ' + getTimeClass(hour);
    textArea.value = plans[hour] || '';

    const saveBtn = document.createElement('button');
    saveBtn.textContent = '💾';
    saveBtn.onclick = () => {
      plans[hour] = textArea.value;
      savePlans(plans);
    };

    timeBlock.appendChild(label);
    timeBlock.appendChild(textArea);
    timeBlock.appendChild(saveBtn);

    plannerEl.appendChild(timeBlock);
  });
}

function formatHour(hour) {
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const hour12 = hour % 12 === 0 ? 12 : hour % 12;
  return `${hour12} ${ampm}`;
}

function getTimeClass(hour) {
  if (hour < currentHour) return 'past';
  if (hour === currentHour) return 'present';
  return 'future';
}

renderPlanner();
