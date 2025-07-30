const time = document.getElementById("time");
const timeformat = document.getElementById("timeFormat");

document.addEventListener('DOMContentLoaded', () => {
  setInterval(showTime, 1000);
});

const showTime = () => {
  let date = new Date();
  let hr = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();

  if (hr > 12) {
    hr = hr - 12;
    hr = hr < 10 ? `0${hr}` : hr;
    min = min < 10 ? `0${min}` : min;
    sec = sec < 10 ? `0${sec}` : sec;
    time.innerHTML = `${hr}:${min}:${sec}`;
    timeformat.innerHTML = "PM";
    timeformat.style.color = "red";
  }
  timeformat.style.fontWeight = "bold";
  timeformat.style.fontSize = "20px";
  timeformat.style.marginTop = "10px";
  timeformat.style.marginLeft = "10px";
}