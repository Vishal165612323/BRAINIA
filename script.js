// Add event listeners after the DOM content is loaded
document.addEventListener("DOMContentLoaded", function () {
  const usernameInput = document.getElementById("usernameInput");
  const addUsernameBtn = document.getElementById("addUsernameBtn");
  const userListUl = document.getElementById("userListUl");
  const usernameSelect = document.getElementById("usernameSelect");
  const confirmBtn = document.getElementById("confirmBtn");
  const hoursInput = document.getElementById("hoursInput");
  const minutesInput = document.getElementById("minutesInput");
  const manualExpInput = document.getElementById("manualExpInput");
  const addManualExpBtn = document.getElementById("addManualExpBtn");
  const removeSelectedBtn = document.getElementById("removeSelectedBtn");

  // Function to add a new username
  addUsernameBtn.addEventListener("click", function () {
    const username = usernameInput.value.trim();
    if (username === "") {
      alert("Username cannot be empty.");
      return;
    }

    // Add to the user list
    const listItem = document.createElement("li");
    listItem.innerHTML = `
      <input type="checkbox" class="user-checkbox" aria-label="Select User">
      <span class="username-exp">${username} (0 EXP)</span>
    `;
    userListUl.appendChild(listItem);

    // Add to the dropdown
    const option = document.createElement("option");
    option.value = username;
    option.textContent = username;
    usernameSelect.appendChild(option);

    // Clear the input
    usernameInput.value = "";
  });

  // Function to confirm and add EXP
  confirmBtn.addEventListener("click", function () {
    const selectedUsername = usernameSelect.value;
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;

    if (!selectedUsername) {
      alert("Please select a username.");
      return;
    }

    if (hours === 0 && minutes === 0) {
      alert("Please enter hours or minutes.");
      return;
    }

    const totalExp = hours * 60 + minutes;
    const listItems = document.querySelectorAll("#userListUl li");
    listItems.forEach((item) => {
      const usernameExpSpan = item.querySelector(".username-exp");
      const checkbox = item.querySelector(".user-checkbox");
      if (usernameExpSpan.textContent.includes(selectedUsername)) {
        // Update the EXP
        const currentExp = parseInt(
          usernameExpSpan.textContent.match(/\((\d+) EXP\)/)[1]
        );
        const updatedExp = currentExp + totalExp;
        usernameExpSpan.textContent = `${selectedUsername} (${updatedExp} EXP)`;
        checkbox.checked = false; // Uncheck if it was checked
      }
    });

    // Clear inputs
    hoursInput.value = "";
    minutesInput.value = "";
  });

  // Function to manually add EXP
  addManualExpBtn.addEventListener("click", function () {
    const selectedUsername = usernameSelect.value;
    const manualExp = parseInt(manualExpInput.value);

    if (!selectedUsername) {
      alert("Please select a username.");
      return;
    }

    if (isNaN(manualExp) || manualExp <= 0) {
      alert("Please enter a valid EXP value.");
      return;
    }

    const listItems = document.querySelectorAll("#userListUl li");
    listItems.forEach((item) => {
      const usernameExpSpan = item.querySelector(".username-exp");
      const checkbox = item.querySelector(".user-checkbox");
      if (usernameExpSpan.textContent.includes(selectedUsername)) {
        // Update the EXP
        const currentExp = parseInt(
          usernameExpSpan.textContent.match(/\((\d+) EXP\)/)[1]
        );
        const updatedExp = currentExp + manualExp;
        usernameExpSpan.textContent = `${selectedUsername} (${updatedExp} EXP)`;
        checkbox.checked = false; // Uncheck if it was checked
      }
    });

    // Clear input
    manualExpInput.value = "";
  });

  // Function to remove selected users
  removeSelectedBtn.addEventListener("click", function () {
    const checkboxes = document.querySelectorAll(".user-checkbox");
    checkboxes.forEach((checkbox) => {
      if (checkbox.checked) {
        const listItem = checkbox.parentElement;

        // Remove from dropdown
        const usernameExpSpan = listItem.querySelector(".username-exp");
        const username = usernameExpSpan.textContent.split(" (")[0];
        const options = Array.from(usernameSelect.options);
        options.forEach((option) => {
          if (option.value === username) {
            option.remove();
          }
        });

        // Remove from list
        listItem.remove();
      }
    });
  });
});
