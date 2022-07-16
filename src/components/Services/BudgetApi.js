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
      accountType,
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
  return response.data;
}

async function postAccount(request) {
  const response = await axios
    .post(`${baseURL}/account`, request)
    .catch(function (error) {
      console.log(error);
    });
  return response;
}

async function postExpense(request) {
  const response = await axios
    .post(`${baseURL}/expense`, request)
    .catch(function (error) {
      console.log(error);
    });
  return response;
}

async function postTransaction(request) {
  const response = await axios
    .post(`${baseURL}/transaction`, request)
    .catch(function (error) {
      console.log(error);
    });
  return response;
}

async function getBudgets() {
  const response = await axios
    .get(`${baseURL}/budgets`)
    .catch(function (error) {
      console.log(error);
    });
  return response;
}

async function getBudgetById(id) {
  const response = await axios
    .get(`${baseURL}/budget?id=${id}`)
    .catch(function (error) {
      console.log(error);
    });
  return response;
}

async function updateAccount(request) {
  const response = await axios
    .put(`${baseURL}/account`, request)
    .catch(function (error) {
      console.log(error);
    });
  return response;
}

async function updateExpense(request) {
  const response = await axios
    .put(`${baseURL}/expense`, request)
    .catch(function (error) {
      console.log(error);
    });
  return response;
}

async function updateTransaction(request) {
  const response = await axios
    .put(`${baseURL}/transaction`, request)
    .catch(function (error) {
      console.log(error);
    });
  return response;
}

async function deleteAccount(id) {
  const response = await axios
    .delete(`${baseURL}/account`, { params: { id: id } })
    .catch(function (error) {
      console.log(error);
    });
  return response;
}

async function deleteExpense(id) {
  const response = await axios
    .delete(`${baseURL}/expense`, { params: { id: id } })
    .catch(function (error) {
      console.log(error);
    });
  return response;
}

async function deleteTransaction(id) {
  const response = await axios
    .delete(`${baseURL}/transaction`, { params: { id: id } })
    .catch(function (error) {
      console.log(error);
    });
  return response;
}

export const budgetApi = {
  getBudgets,
  getBudgetById,
  postAccount,
  postBudget,
  postExpense,
  postTransaction,
  updateAccount,
  updateExpense,
  updateTransaction,
  deleteAccount,
  deleteExpense,
  deleteTransaction,
};
