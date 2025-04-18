// Handle Signup
document.getElementById('signup-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Get signup details
    const username = document.getElementById('signup-username').value;
    const password = document.getElementById('signup-password').value;
  
    // Save credentials in localStorage
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  
    alert('Signup successful! Please log in.');
  
    // Switch to login section
    document.getElementById('signup-section').style.display = 'none';
    document.getElementById('login-section').style.display = 'block';
  });
  
  // Handle Login
  document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Get login details
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
  
    // Validate credentials
    const storedUsername = localStorage.getItem('username');
    const storedPassword = localStorage.getItem('password');
  
    if (username === storedUsername && password === storedPassword) {
      alert(`Welcome, ${username}!`);
  
      // Switch to welcome section
      document.getElementById('login-section').style.display = 'none';
      document.getElementById('welcome-section').style.display = 'block';
  
      // Display the username
      document.getElementById('welcome-username').textContent = username;
    } else {
      alert('Invalid login credentials. Please try again.');
    }
  });
  
  // Handle Savings Planner
  document.getElementById('savings-planner-form').addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Get form values
    const income = parseFloat(document.getElementById('income').value);
    const savingGoal = document.getElementById('saving-goal').value;
    const savingAmount = parseFloat(document.getElementById('saving-amount').value);
  
    const expenses = Array.from(document.querySelectorAll('#expenses .expense')).map(expense => {
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
    const resultDiv = document.getElementById('result');
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