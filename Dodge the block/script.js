document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the input values
    const date = document.getElementById("date").value;
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Create an object to store the email and password
    const entry = { date, name, email, password };

    // Get the saved entries from localStorage or create an empty array if not available
    let savedEntries = JSON.parse(localStorage.getItem("entries")) || [];

    // Push the new entry to the saved entries array
    savedEntries.push(entry);

    // Save the updated entries back to localStorage
    localStorage.setItem("entries", JSON.stringify(savedEntries));

    // Display the saved entries
    displaySavedEntries();
    
    // Clear form fields
    document.getElementById("loginForm").reset();
});

// Function to display saved entries
function displaySavedEntries() {
    const savedEntries = JSON.parse(localStorage.getItem("entries")) || [];
    const savedEntriesDiv = document.getElementById("savedEntries");
    savedEntriesDiv.innerHTML = '';

    savedEntries.forEach((entry, index) => {
        savedEntriesDiv.innerHTML += `<div>
            <strong>Date:</strong> ${entry.date} <br>
            <strong>Name:</strong> ${entry.name} <br>
            <strong>Email:</strong> ${entry.email} <br>
            <strong>Password:</strong> ${entry.password} <br>
            <button class="delete-btn" onclick="deleteEntry(${index})">Delete</button>
            </div>`;
    });
}

// Function to delete a saved entry
function deleteEntry(index) {
    let savedEntries = JSON.parse(localStorage.getItem("entries")) || [];
    savedEntries.splice(index, 1); // Remove entry by index
    localStorage.setItem("entries", JSON.stringify(savedEntries));
    displaySavedEntries(); // Re-render the list
}

// Display saved entries when the page loads
window.onload = displaySavedEntries;
