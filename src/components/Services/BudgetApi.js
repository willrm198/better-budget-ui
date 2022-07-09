import axios from "axios";
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

  let from = moment(request.budget.startDate).format("YYYY-MM-DD").toString();
  let to = moment(request.budget.endDate).format("YYYY-MM-DD").toString();
  const response = await axios
    .post(`${baseURL}/budget`, {
      budget: {
        startDate: from,
        endDate: to,
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
