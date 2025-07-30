const Days = document.getElementById('Days');
const Hours = document.getElementById('Hours');
const Mins = document.getElementById('Mins');
const Secs = document.getElementById('Secs');

const formatTime = (time) => {
  return time < 10 ? `0${time}` : time;
}

const updateCountDown = (deadline, currentTime) => {
  const timedifference = deadline - currentTime;

  let calSecs = Math.floor(timedifference / 1000) % 60;
  let calMins = Math.floor(timedifference / 1000 / 60) % 60;
  let calHours = Math.floor(timedifference / 1000 / 60 / 60) % 24;
  let calDays = Math.floor(timedifference / 1000 / 60 / 60 / 24);

  Days.textContent = formatTime(calDays);
  Hours.textContent = formatTime(calHours);
  Mins.textContent = formatTime(calMins);
  Secs.textContent = formatTime(calSecs);
}

const countdown = (targetDate) => {
  const timer = setInterval(() => {
    const currentTime = new Date();
    const timedifference = targetDate - currentTime;

    if (timedifference <= 0) {
      clearInterval(timer);
      Days.textContent = Hours.textContent = Mins.textContent = Secs.textContent = "00";
      return;
    }

    updateCountDown(targetDate, currentTime);
  }, 1000);
}

const targetDate = new Date("June 06 2025 12:00:00");
countdown(targetDate);
