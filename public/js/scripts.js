document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signup-form");
  const loginForm = document.getElementById("login-form");
  const loginError = document.getElementById("login-error");
  const signupSection = document.getElementById("signup-section");
  const loginSection = document.getElementById("login-section");
  const welcomeSection = document.getElementById("welcome-section");
  const resultDiv = document.getElementById("result");

  // Simulated database for demo purposes
  const users = [];

  // Handle Signup
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const newUser = {
      fullname: signupForm["signup-fullname"].value,
      email: signupForm["signup-email"].value,
      username: signupForm["signup-username"].value,
      password: signupForm["signup-password"].value,
      phone: signupForm["signup-phone"].value,
      profession: signupForm["signup-profession"].value,
    };

    // Save credentials in localStorage
    localStorage.setItem('username', newUser.username);
    localStorage.setItem('password', newUser.password);

    users.push(newUser);
    alert("Signup successful! Please login.");
    signupSection.style.display = "none";
    loginSection.style.display = "block";
  });

  // Handle Login
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = loginForm["username"].value;
    const password = loginForm["password"].value;

    // Validate credentials
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');

    const user = users.find(u => u.username === username && u.password === password) || 
                 (username === storedUsername && password === storedPassword);

    if (user) {
      loginSection.style.display = "none";
      welcomeSection.style.display = "block";
      document.getElementById("welcome-username").textContent = user.fullname || username;

      alert("Login successful! Redirecting...");
      setTimeout(() => {
        window.location.href = "saving.html"; // Redirect to saving.html
      }, 2000);
    } else {
      loginError.style.display = "block";
    }
  });

  // Handle Savings Planner
  document.getElementById("savings-planner-form").addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const income = parseFloat(document.getElementById("income").value);
    const savingGoal = document.getElementById("saving-goal").value;
    const savingAmount = parseFloat(document.getElementById("saving-amount").value);

    const expenses = Array.from(document.querySelectorAll("#expenses .expense")).map(expense => {
      return {
        name: expense.querySelector('[name="expense-name"]').value,
        amount: parseFloat(expense.querySelector('[name="expense-amount"]').value),
      };
    });

    // Calculate total expenses
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

    // Calculate remaining amount
    const remainingAmount = income - totalExpenses;

    // Display result
    if (remainingAmount >= savingAmount) {
      // If savings goal can be achieved
      resultDiv.innerHTML = `
        <h2>Plan to Achieve Your Savings Goal</h2>
        <p>After deducting your expenses, you have <strong>${remainingAmount.toFixed(2)}</strong> left.</p>
        <p>You can save <strong>${savingAmount}</strong> for your goal: <strong>${savingGoal}</strong>.</p>
        <p>Suggested Plan: Save equally across your expenses:</p>
        <ul>
          ${expenses
            .map(expense => {
              const share = savingAmount / expenses.length;
              return `<li>From ${expense.name}, save <strong>${share.toFixed(2)}</strong>.</li>`;
            })
            .join('')}
        </ul>
      `;
    } else {
      // If savings goal cannot be achieved
      resultDiv.innerHTML = `
        <h2>Insufficient Funds</h2>
        <p>After deducting your expenses, you have <strong>${remainingAmount.toFixed(2)}</strong> left.</p>
        <p>Unfortunately, this is not enough to save <strong>${savingAmount}</strong> for your goal: <strong>${savingGoal}</strong>.</p>
        <p>Consider reducing your expenses or saving over a longer period.</p>
      `;
    }
  });
});