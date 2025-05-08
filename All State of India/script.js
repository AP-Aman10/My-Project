// Script to insert the table data dynamically

const statesAndUTs = [
    { sr: "01", state: "Andhra Pradesh", districts: 26, utsr: "01", ut: "Andaman and Nicobar Islands", utdistricts: 3 },
    { sr: "02", state: "Arunachal Pradesh", districts: 26, utsr: "02", ut: "Chandigarh", utdistricts: 1 },
    { sr: "03", state: "Assam", districts: 35, utsr: "03", ut: "Dadra and Nagar Haveli and Daman and Diu", utdistricts: 2 },
    { sr: "04", state: "Bihar", districts: 38, utsr: "04", ut: "Lakshadweep", utdistricts: 1 },
    { sr: "05", state: "Chhattisgarh", districts: 33, utsr: "05", ut: "Delhi", utdistricts: 11 },
    { sr: "06", state: "Goa", districts: 2, utsr: "06", ut: "Puducherry", utdistricts: 4 },
    { sr: "07", state: "Gujarat", districts: 33, utsr: "07", ut: "Ladakh", utdistricts: 2 },
    { sr: "08", state: "Haryana", districts: 22, utsr: "08", ut: "Jammu and Kashmir", utdistricts: 20 },
    { sr: "09", state: "Himachal Pradesh", districts: 12 },
    { sr: "10", state: "Jharkhand", districts: 24 },
    { sr: "11", state: "Karnataka", districts: 31 },
    { sr: "12", state: "Kerala", districts: 14 },
    { sr: "13", state: "Madhya Pradesh", districts: 55 },
    { sr: "14", state: "Maharashtra", districts: 36 },
    { sr: "15", state: "Manipur", districts: 16 },
    { sr: "16", state: "Meghalaya", districts: 12 },
    { sr: "17", state: "Mizoram", districts: 11 },
    { sr: "18", state: "Nagaland", districts: 16 },
    { sr: "19", state: "Odisha", districts: 30 },
    { sr: "20", state: "Punjab", districts: 23 },
    { sr: "21", state: "Rajasthan", districts: 50 },
    { sr: "22", state: "Sikkim", districts: 6 },
    { sr: "23", state: "Tamil Nadu", districts: 38 },
    { sr: "24", state: "Telangana", districts: 33 },
    { sr: "25", state: "Tripura", districts: 8 },
    { sr: "26", state: "Uttar Pradesh", districts: 75 },
    { sr: "27", state: "Uttarakhand", districts: 13 },
    { sr: "28", state: "West Bengal", districts: 23 }
  ];
  
  const tableBody = document.querySelector("#indiaTable tbody");
  
  statesAndUTs.forEach(item => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.sr}</td>
      <td>${item.state}</td>
      <td>${item.districts}</td>
      <td>${item.utsr || ""}</td>
      <td>${item.ut || ""}</td>
      <td>${item.utdistricts || ""}</td>
    `;
    tableBody.appendChild(row);
  });