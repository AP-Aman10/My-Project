function generateTable() {
      const num = parseInt(document.getElementById("numberInput").value);
      const table = document.getElementById("multiplicationTable");

      table.innerHTML = ""; // Clear previous content

      if (isNaN(num)) {
        alert("Please enter a valid number.");
        return;
      }

      const caption = table.createCaption();
      caption.innerText = `Multiplication Table of ${num}`;

      for (let i = 1; i <= 10; i++) {
        const row = table.insertRow();
        const cell1 = row.insertCell();
        const cell2 = row.insertCell();
        const cell3 = row.insertCell();
        const cell4 = row.insertCell();
        const cell5 = row.insertCell();

        cell1.innerText = `${num}`;
        cell2.innerText = `X`;
        cell3.innerText = `${i}`;
        cell4.innerText = `=`;
        cell5.innerText = `${num * i}`;
      }
    }