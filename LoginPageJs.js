function showForm(type) {
  document.getElementById('userForm').classList.remove('active');
  document.getElementById('adminForm').classList.remove('active');
  document.getElementById('userBtn').classList.remove('active');
  document.getElementById('adminBtn').classList.remove('active');

  if (type === 'user') {
      document.getElementById('userForm').classList.add('active');
      document.getElementById('userBtn').classList.add('active');
  } else {
      document.getElementById('adminForm').classList.add('active');
      document.getElementById('adminBtn').classList.add('active');
  }
}

// Function to save credentials to Excel
function saveToExcel(userType, email, password) {
  let data = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : [];

  // Check if user already exists
  if (data.some(user => user.email === email && user.type === userType)) {
      alert("User already exists!");
      return;
  }

  // Add new user data
  data.push({ type: userType, email: email, password: password });
  localStorage.setItem("userData", JSON.stringify(data));

  // Convert to Excel
  let worksheet = XLSX.utils.json_to_sheet(data);
  let workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Users");

  // Save Excel file
  XLSX.writeFile(workbook, "user_credentials.xlsx");
  alert("Signup successful!");
}

// Function to check login
function login(userType, email, password) {
  let data = localStorage.getItem("userData") ? JSON.parse(localStorage.getItem("userData")) : [];
  
  let user = data.find(user => user.email === email && user.password === password && user.type === userType);
  
  if (user) {
      alert(`${userType} Login Successful!`);
      window.location.href = "dashboard.html";  // Redirect to a new page
  } else {
      alert("Invalid credentials!");
  }
}

// Signup Functions
function signupUser() {
  let email = document.getElementById("userEmail").value;
  let password = document.getElementById("userPassword").value;
  if (email && password) {
      saveToExcel("User", email, password);
  } else {
      alert("Please fill in all fields.");
  }
}

function signupAdmin() {
  let email = document.getElementById("adminEmail").value;
  let password = document.getElementById("adminPassword").value;
  if (email && password) {
      saveToExcel("Admin", email, password);
  } else {
      alert("Please fill in all fields.");
  }
}

// Login Functions
function loginUser() {
  let email = document.getElementById("userEmail").value;
  let password = document.getElementById("userPassword").value;
  login("User", email, password);
}

function loginAdmin() {
  let email = document.getElementById("adminEmail").value;
  let password = document.getElementById("adminPassword").value;
  login("Admin", email, password);
}