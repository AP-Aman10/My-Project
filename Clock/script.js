// script.js

function updateClock() {
    const hourHand = document.getElementById("hour");
    const minHand = document.getElementById("min");
    const secHand = document.getElementById("sec");
  
    const now = new Date();
  
    const seconds = now.getSeconds();
    const minutes = now.getMinutes();
    const hours = now.getHours();
  
    // Calculate angles
    const secAngle = seconds * 6; // 360 / 60
    const minAngle = minutes * 6 + seconds * 0.1; // 360 / 60 + smooth motion
    const hourAngle = ((hours % 12) * 30) + (minutes * 0.5); // 360 / 12 + smooth motion
  
    // Apply rotation
    secHand.style.transform = `rotate(${secAngle}deg)`;
    minHand.style.transform = `rotate(${minAngle}deg)`;
    hourHand.style.transform = `rotate(${hourAngle}deg)`;
  }
  
  // Update every 1000ms (1 second)
  setInterval(updateClock, 1000);
  updateClock(); // Initial call to show correct time on load
  