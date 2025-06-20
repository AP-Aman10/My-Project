const timer = document.querySelector(".timer");
const title = document.querySelector(".title");
const startBtn = document.querySelector(".startBtn");
const PauseBtn = document.querySelector(".PauseBtn");
const ResumeBtn = document.querySelector(".ResumeBtn");
const ResetBtn = document.querySelector(".ResetBtn");
const pomoCountDisplay = document.querySelector(".pomoCountDisplay");

const Work_Time = 25 * 60;
const Break_Time = 5 * 60;
let timerID = null;
let oneRoundCompleted = false;
let paused = false;
let remainingTime = Work_Time;

const updateTitle = (msg) => {
    title.textContent = msg;
};

const saveLocalCount = () => {
    let counts = JSON.parse(localStorage.getItem("pomoCounts"));
    counts !== null ? counts++ : counts = 1;
    localStorage.setItem("pomoCounts", JSON.stringify(counts));
};

const countDown = () => {
    const mins = Math.floor(remainingTime / 60).toString().padStart(2, '0');
    const secs = Math.floor(remainingTime % 60).toString().padStart(2, '0');

    timer.textContent = `${mins}:${secs}`;
    remainingTime--;

    if (remainingTime < 0) {
        stopTimer();
        if (!oneRoundCompleted) {
            remainingTime = Break_Time;
            timerID = startTimer();
            oneRoundCompleted = true;
            updateTitle("It's Break Time!");
        } else {
            updateTitle("Completed 1 Round of Pomodoro Technique!");
            setTimeout(() => updateTitle("Start Timer Again"), 4000);
            saveLocalCount();
            showPomoCounts();
            oneRoundCompleted = false;
            remainingTime = Work_Time;
        }
    }
};

const startTimer = () => {
    if (timerID !== null) {
        stopTimer();
    }
    return setInterval(countDown, 1000);
};

const stopTimer = () => {
    clearInterval(timerID);
    timerID = null;
};

const getTimeInSeconds = (timeString) => {
    const [minutes, seconds] = timeString.split(":");
    return parseInt(minutes) * 60 + parseInt(seconds);
};

startBtn.addEventListener('click', () => {
    remainingTime = Work_Time;
    timerID = startTimer();
    updateTitle("It's Work Time!");
});

ResetBtn.addEventListener('click', () => {
    stopTimer();
    remainingTime = Work_Time;
    timer.textContent = "25:00";
    oneRoundCompleted = false;
    updateTitle("Timer Reset!");
});

PauseBtn.addEventListener('click', () => {
    stopTimer();
    paused = true;
    updateTitle("Timer Paused!");
});

ResumeBtn.addEventListener('click', () => {
    if (paused) {
        timerID = startTimer();
        paused = false;
        updateTitle(oneRoundCompleted ? "It's Break Time!" : "It's Work Time!");
    }
});

const showPomoCounts = () => {
    const counts = JSON.parse(localStorage.getItem("pomoCounts"));
    if (counts > 0) {
        pomoCountDisplay.style.display = "flex";
        pomoCountDisplay.firstElementChild.textContent = counts;
    }
};

showPomoCounts();