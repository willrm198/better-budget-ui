import axios from "axios";
import react from "react";
import moment from "moment";

const baseURL = "http://192.168.1.74:8080/betterBudget/v1";

async function postBudget(request) {
  const expenses = request.expenses.map(
    ({
      expenseName: name,
      expenseDueDate: dueDate,
      expenseAmount: amount,
    }) => ({
      name,
      dueDate,
      amount,
    })
  );

  const accounts = request.accounts.map(
    ({
      accountName: name,
      accountLimit: limitAmount,
      accountBalance: balance,
      accountType: accountType,
    }) => ({
      name,
      limitAmount,
      balance,
      accountType,
    })
  );

  let from = new Date(request.budget.startDate);
  console.log(`from date: ${from}`);
  let from2 = moment(request.budget.startDate).format("YYYY-MM-DD").toString();
  let to = new Date(request.budget.endDate);
  let to2 = moment(request.budget.endDate).format("YYYY-MM-DD").toString();
  console.log(`to date: ${to}`);
  const response = await axios
    .post(`${baseURL}/budget`, {
      budget: {
        startDate: from2,
        endDate: to2,
        budgetType: request.budget.budgetType,
      },
      expenses: expenses,
      accounts: accounts,
    })
    .then((response) => {})
    .catch(function (error) {
      console.log(error);
    });
  return response;
}

export const budgetApi = {
  postBudget,
};
