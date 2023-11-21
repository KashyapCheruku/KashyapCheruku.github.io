// Function to load entries from localStorage
function loadEntries() {
  var entries = JSON.parse(localStorage.getItem('entries')) || [];
  var tableBody = document.getElementById('entriesTableBody');

  // Clear existing entries
  tableBody.innerHTML = '';

  // Populate table with entries
  entries.forEach(function (formData) {
    var row = tableBody.insertRow();
    var columns = ['name', 'email', 'password', 'dob', 'acceptTerms'];

    columns.forEach(function (column) {
      var cell = row.insertCell();
      cell.textContent = formData[column];
    });
  });
}

// Function to save entry to localStorage
function saveEntry(formData) {
  var entries = JSON.parse(localStorage.getItem('entries')) || [];
  entries.push(formData);
  localStorage.setItem('entries', JSON.stringify(entries));
}

// Load existing entries on page load
loadEntries();

document.getElementById('email').addEventListener('input', validateEmail);
document.getElementById('password').addEventListener('input', validatePassword);

function validateEmail() {
  var email = document.getElementById('email').value;
  var emailValidation = document.getElementById('emailValidation');
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    emailValidation.textContent = 'Please enter a valid email address.';
  } else {
    emailValidation.textContent = '';
  }
}

function validatePassword() {
  var password = document.getElementById('password').value;
  var passwordValidation = document.getElementById('passwordValidation');
  var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  if (!passwordRegex.test(password)) {
    passwordValidation.textContent = 'Password must contain at least 8 characters, and can include letters and numbers. No underscore or \'@\' allowed.';
  } else {
    passwordValidation.textContent = '';
  }
}

document.getElementById('registrationForm').addEventListener('submit', function (event) {
  event.preventDefault();

  var formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    password: document.getElementById('password').value,
    dob: document.getElementById('dob').value,
    acceptTerms: document.getElementById('acceptTerms').checked ? 'Yes' : 'No'
  };

  // Check for a valid email format
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.email)) {
    alert('Please enter a valid email address.');
    return;
  }

  // Check for a valid password format
  var passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(formData.password)) {
    alert('Password must contain at least 8 characters, and can include letters and numbers. No underscore or \'@\' allowed.');
    return;
  }

  // Check if age is between 18 and 55
  var dobDate = new Date(formData.dob);
  var today = new Date();
  var age = today.getFullYear() - dobDate.getFullYear();
  var monthDiff = today.getMonth() - dobDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
    age--;
  }

  if (age < 18 || age > 55) {
    alert('You must be between 18 and 55 years old to register.');
    return;
  }

  if (!formData.name || !formData.email || !formData.password || !formData.dob || !formData.acceptTerms) {
    alert('Please fill in all details before submitting.');
    return;
  }

  saveEntry(formData);

  // Reload entries after saving a new one
  loadEntries();

  document.getElementById('registrationForm').reset();
});
