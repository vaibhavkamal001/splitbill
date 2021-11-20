
const category = document.getElementById("expenseName");
const amount = document.getElementById("expenseAmount");
const Expensesbtn = document.getElementById("addExpensesbtn");
const expense = document.getElementById("expenses");

Expensesbtn.addEventListener("click", () => {
  const data = `<div class="input-group mt-3">
  <input
    type="text"
    class="form-control"
    aria-label="Recipient's username with two button addons"
  />
  <button class="btn btn-outline-secondary" type="button">
    Remove
  </button>
</div>`;
  expense.append(data);
  console.log(category.value);
  console.log(amount.value);
});
