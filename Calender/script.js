const monthYearEl = document.getElementById("month-year");
    const daysEl = document.getElementById("days");
    const prevBtn = document.getElementById("prev");
    const nextBtn = document.getElementById("next");

    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    let currentDate = new Date();
    const today = new Date();

    function renderCalendar(date) {
      const year = date.getFullYear();
      const month = date.getMonth();

      monthYearEl.textContent = `${months[month]} ${year}`;

      const firstDayIndex = (new Date(year, month, 1).getDay() + 6) % 7;
      const lastDate = new Date(year, month + 1, 0).getDate();
      const prevMonthLastDate = new Date(year, month, 0).getDate();

      daysEl.innerHTML = "";

      // Prev month days
      for (let i = firstDayIndex; i > 0; i--) {
        const day = document.createElement("div");
        day.classList.add("fade");
        day.textContent = prevMonthLastDate - i + 1;
        daysEl.appendChild(day);
      }

      // Current month days
      for (let i = 1; i <= lastDate; i++) {
        const day = document.createElement("div");
        day.textContent = i;
        if (
          i === today.getDate() &&
          month === today.getMonth() &&
          year === today.getFullYear()
        ) {
          day.classList.add("today");
        }
        daysEl.appendChild(day);
      }

      // Next month days
      const totalCells = firstDayIndex + lastDate;
      const nextDays = 7 - (totalCells % 7);
      if (nextDays < 7) {
        for (let i = 1; i <= nextDays; i++) {
          const day = document.createElement("div");
          day.classList.add("fade");
          day.textContent = i;
          daysEl.appendChild(day);
        }
      }
    }

    prevBtn.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() - 1);
      renderCalendar(currentDate);
    });

    nextBtn.addEventListener("click", () => {
      currentDate.setMonth(currentDate.getMonth() + 1);
      renderCalendar(currentDate);
    });

    renderCalendar(currentDate);