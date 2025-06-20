let timeDisplay = document.querySelector(".timeDisplay");
let stopBtn = document.getElementById("stopBtn");
let startBtn = document.getElementById("startBtn");
let resetBtn = document.getElementById("resetBtm");

let mses = 0;
let secs = 0;
let mins = 0;
let hours = 0;

let timerId = null;

startBtn.addEventListener("click", function() {
  if (timerId !== null) {
    clearInterval(timerId);
  }
  timerId = setInterval(startTimer, 10);
});

stopBtn.addEventListener("click", function(){
  clearInterval(timerId);
});

resetBtn.addEventListener("click", function(){
  clearInterval(timerId);
  timeDisplay.innerHTML = `00 : 00 : 00 : 00`;
  mses = 0;
  secs = 0;
  mins = 0;
  hours = 0;
});

function startTimer() {
  mses++
  if (mses == 100) {
    mses = 0;
    secs++;
    if (secs == 60) {
      secs = 0;
      mins++;
    }
    if (mins == 60){
      mins = 0;
      hours++;
    }
  }
  
  let hoursString = hours < 10 ? "0" + hours : hours;
  let msecString = mins < 10 ? "0" + mins : mins;
  let secString = secs < 10 ? "0" + secs : secs;
  let mseString = mses < 10 ? "0" + mses : mses;

  timeDisplay.innerHTML = `${hoursString} : ${msecString} : ${secString} : ${mseString}`;
}