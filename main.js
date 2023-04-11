const balance = document.querySelector("#balance");
const moneyPlus = document.querySelector("#money-plus");
const moneyMinus = document.querySelector("#money-minus");
const list = document.querySelector("#list");
const form = document.querySelector("#form");
const textInput = document.querySelector("#text");
const amountInput = document.querySelector("#amount");

// const dummyTransactions = [
//   { id: 1, text: "Flower", amount: -20 },
//   { id: 2, text: "Salary", amount: 300 },
//   { id: 3, text: "Book", amount: -10 },
//   { id: 4, text: "Camera", amount: 150 },
// ];

const localStorageTransactions = JSON.parse(
  localStorage.getItem("transactions")
);

let transactions =
  localStorage.getItem("transactions") !== null ? localStorageTransactions : [];

// Add transaction
function addTransaction(e) {
  e.preventDefault();

  if (textInput.value.trim() === "" || amountInput.value.trim() === "") {
    alert("Please add text and amount");
  } else {
    const transaction = {
      id: generateID(),
      text: textInput.value,
      amount: +amountInput.value,
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();
  }
}

// Generatin ID

function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add transactions to DOM list

function addTransactionDOM(transaction) {
  const sign = transaction.amount < 0 ? "-" : "+";

  const item = document.createElement("li");

  // Add class

  item.classList.add(transaction.amount < 0 ? "minus" : "plus");

  item.innerHTML = `${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransction(${
    transaction.id
  })">x</button>`;

  list.appendChild(item);
}

// update the balance, income and expense

function updateValues() {
  const amounts = transactions.map((transaction) => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter((item) => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense =
    amounts.filter((item) => item < 0).reduce((acc, item) => (acc += item), 0) *
    -(1).toFixed(2);

  balance.textContent = `$${total}`;
  moneyPlus.textContent = `$${income}`;
  moneyMinus.textContent = `$${expense}`;
}

// Remove transaction by ID
function removeTransction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);

  updateLocalStorage();

  init();
}

// Update local storage transactions

function updateLocalStorage() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// init
function init() {
  list.innerHTML = "";

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener("submit", addTransaction);
