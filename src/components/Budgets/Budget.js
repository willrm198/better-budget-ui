import React, { useEffect, useState } from "react";
import { Button, Card, Col, Row, Table } from "react-bootstrap";
import { useParams } from "react-router-dom";
import Moment from "moment";

import AccountForm from "../Accounts/AccountForm.js";
import Backdrop from "../Common/Backdrop.js";
import { budgetApi } from "../Services/BudgetApi.js";
import Modal from "../Common/Modal.js";
import styleClasses from "./Budget.module.css";
import ExpenseForm from "../Expenses/ExpenseForm.js";
import ConfirmDelete from "../Common/ConfirmDelete.js";
import TransactionForm from "../Transactions/TransactionForm.js";

const Budget = () => {
  const { id } = useParams();
  const [budget, setBudget] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [editModalContent, setEditModalContent] = useState(<></>);

  let expenses = budget.expenses,
    accounts = budget.accounts,
    transactions = budget.transactions;

  useEffect(() => {
    budgetApi.getBudgetById(id).then((response) => {
      let budgetRsp = response.data;

      budgetRsp.budget.startDate = Moment(
        new Date(budgetRsp.budget.startDate)
      ).format("MM/DD/YYYY");

      budgetRsp.budget.endDate = Moment(
        new Date(budgetRsp.budget.endDate)
      ).format("MM/DD/YYYY");

      setBudget(budgetRsp);
      setIsLoading(false);
    });
  }, [id]);

  function refreshPage() {
    window.location.reload(true);
  }

  const AddOnClickHandler = (event) => {
    setEditModalIsOpen(true);
    let name = event.target.parentElement.getAttribute("name");
    switch (name) {
      case "AddExpenseBtn":
        setEditModalContent(
          <ExpenseForm
            budgetId={id}
            isUpdate={false}
            onCancel={closeModalHandler}
            refresh={refreshPage}
          />
        );
        break;
      case "AddAccountBtn":
        setEditModalContent(
          <AccountForm
            budgetId={id}
            isUpdate={false}
            onCancel={closeModalHandler}
            refresh={refreshPage}
          />
        );
        break;
      case "AddTransactionBtn":
        setEditModalContent(
          <TransactionForm
            budgetId={id}
            isUpdate={false}
            onCancel={closeModalHandler}
            refresh={refreshPage}
          />
        );
        break;
      default:
    }
  };

  const rowClickHandler = (event) => {
    // for editing an entry
    setEditModalIsOpen(true);
    let rowName = event.target.parentElement.getAttribute("name");
    let id = event.target.parentElement.getAttribute("itemID");
    switch (rowName) {
      case "expenseRow":
        let expense = expenses.find((exp) => (exp.id = id));
        setEditModalContent(
          <ExpenseForm
            budgetId={id}
            data={expense}
            isUpdate={true}
            onCancel={closeModalHandler}
            refresh={refreshPage}
          />
        );
        break;
      case "accountRow":
        let account = accounts.find((acc) => (acc.id = id));
        setEditModalContent(
          <AccountForm
            budgetId={id}
            data={account}
            isUpdate={true}
            onCancel={closeModalHandler}
            refresh={refreshPage}
          />
        );
        break;
      case "transactionRow":
        let transaction = transactions.find((trx) => (trx.id = id));
        setEditModalContent(
          <TransactionForm
            budgetId={id}
            data={transaction}
            isUpdate={true}
            onCancel={closeModalHandler}
            refresh={refreshPage}
          />
        );
        break;
      default:
    }
  };

  const deleteOnClickHandler = (item, name) => {
    setEditModalIsOpen(true);
    setEditModalContent(
      <ConfirmDelete
        item={item}
        name={name}
        cancel={closeModalHandler}
        refresh={refreshPage}
      />
    );
  };

  function closeModalHandler() {
    setEditModalIsOpen(false);
  }

  return (
    <>
      {editModalIsOpen && <Modal>{editModalContent}</Modal>}
      <Card
        style={{
          marginLeft: "100px",
          marginRight: "100px",
          minHeight: "500px",
        }}
      >
        <Card.Title
          style={{ textAlign: "center", fontSize: "35px", marginTop: "50px" }}
        >
          Budget
        </Card.Title>
        <Card.Body>
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            <>
              <Row style={{ padding: "20px" }}>
                <Col name="ExpensesCol">
                  <Row>
                    <Col name="ExpensesHeader">
                      <h5 style={{ textAlign: "center" }}>Expenses</h5>
                    </Col>
                    <Col xs={1} md={2} name="AddExpenseBtn">
                      <Button
                        variant="outline-success"
                        onClick={AddOnClickHandler}
                        style={{
                          fontSize: "20px",
                          height: "30px",
                          width: "25px",
                          paddingLeft: "5px",
                          paddingTop: "0px",
                        }}
                      >
                        +
                      </Button>
                    </Col>
                  </Row>
                  <Table>
                    <thead>
                      <tr>
                        <td>Name</td>
                        <td>Amount</td>
                        <td>Due Date</td>
                      </tr>
                    </thead>
                    <tbody>
                      {expenses.map((expense) => {
                        let idx = expense.id;
                        let expenseName = `expenseName-${idx}`,
                          expenseAmount = `expenseAmount-${idx}`,
                          expenseDueDate = `expenseDueDate-${idx}`;
                        return (
                          <tr
                            key={idx}
                            itemID={idx}
                            name="expenseRow"
                            className={styleClasses.resultRow}
                            onClick={rowClickHandler.bind(this)}
                          >
                            <td
                              name="expenseName"
                              id={expenseName}
                              data-id={idx}
                            >
                              {expense.name}
                            </td>
                            <td
                              name="expenseAmount"
                              id={expenseAmount}
                              data-id={idx}
                            >
                              {expense.amount}
                            </td>
                            <td
                              name="expenseDueDate"
                              id={expenseDueDate}
                              data-id={idx}
                            >
                              {expense.dueDate}
                            </td>
                            <td>
                              <Button
                                style={{ height: "1.5rem", paddingTop: "0px" }}
                                variant="outline-danger"
                                onClick={() =>
                                  deleteOnClickHandler(expense, "expense")
                                }
                              >
                                X
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Col>

                <Col name="AccountsCol" style={{ paddingLeft: "20px" }}>
                  <Row>
                    <Col name="AccountsHeader">
                      <h5 style={{ textAlign: "center" }}>Accounts</h5>
                    </Col>
                    <Col xs={1} md={2} name="AddAccountBtn">
                      <Button
                        variant="outline-success"
                        onClick={AddOnClickHandler}
                        style={{
                          fontSize: "20px",
                          height: "30px",
                          width: "25px",
                          paddingLeft: "5px",
                          paddingTop: "0px",
                        }}
                      >
                        +
                      </Button>
                    </Col>
                  </Row>
                  <Table>
                    <thead>
                      <tr>
                        <td>Name</td>
                        <td>Limit</td>
                        <td>Balance</td>
                        <td>Type</td>
                      </tr>
                    </thead>
                    <tbody>
                      {accounts.map((account) => {
                        let idx = account.id;
                        let accountName = `accountName-${idx}`,
                          accountLimit = `accountLimit-${idx}`,
                          accountBalance = `accountBalance-${idx}`,
                          accountType = `accountType-${idx}`;
                        return (
                          <tr
                            key={idx}
                            itemID={idx}
                            onClick={rowClickHandler.bind(this)}
                            className={styleClasses.resultRow}
                            name="accountRow"
                          >
                            <td
                              name="accountName"
                              id={accountName}
                              data-id={idx}
                            >
                              {account.name}
                            </td>
                            <td
                              name="accountLimit"
                              id={accountLimit}
                              data-id={idx}
                            >
                              {account.limitAmount}
                            </td>
                            <td
                              name="accountBalance"
                              id={accountBalance}
                              data-id={idx}
                            >
                              {account.balance}
                            </td>
                            <td
                              name="accountType"
                              id={accountType}
                              data-id={idx}
                            >
                              {account.accountType}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row style={{ padding: "20px" }}>
                <Row>
                  <Col name="transactionsHeader">
                    <h5 style={{}}>Transactions</h5>
                  </Col>
                  <Col xs={1} md={1} name="AddTransactionBtn">
                    <Button
                      variant="outline-success"
                      onClick={AddOnClickHandler}
                      style={{
                        fontSize: "20px",
                        height: "30px",
                        width: "25px",
                        paddingLeft: "5px",
                        paddingTop: "0px",
                      }}
                    >
                      +
                    </Button>
                  </Col>
                </Row>
                <Col>
                  <Table>
                    <thead>
                      <tr>
                        <td>Type</td>
                        <td>Date</td>
                        <td>Category</td>
                        <td>Description</td>
                        <td>Amount</td>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map((trx) => {
                        let idx = trx.id;
                        let transactionType = `transactionType-${idx}`,
                          transactionDate = `transactionDate-${idx}`,
                          transactionCategory = `transactionCategory-${idx}`,
                          transactionDescription = `transactionDescription-${idx}`,
                          transactionAmount = `transactionAmount-${idx}`;
                        return (
                          <tr
                            key={idx}
                            itemID={idx}
                            name="transactionRow"
                            className={styleClasses.resultRow}
                            onClick={rowClickHandler.bind(this)}
                          >
                            <td
                              name="transactionType"
                              id={transactionType}
                              data-id={idx}
                            >
                              {trx.transactionType}
                            </td>
                            <td
                              name="transactionDate"
                              id={transactionDate}
                              data-id={idx}
                            >
                              {trx.transactionDate}
                            </td>
                            <td
                              name="transactionCategory"
                              id={transactionCategory}
                              data-id={idx}
                            >
                              {trx.category}
                            </td>
                            <td
                              name="transactionDescription"
                              id={transactionDescription}
                              data-id={idx}
                            >
                              {trx.description}
                            </td>
                            <td
                              name="transactionAmount"
                              id={transactionAmount}
                              data-id={idx}
                            >
                              {trx.amount}
                            </td>
                            <td>
                              <Button
                                style={{ height: "1.5rem", paddingTop: "0px" }}
                                variant="outline-danger"
                                onClick={() =>
                                  deleteOnClickHandler(trx, "transaction")
                                }
                              >
                                X
                              </Button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </>
          )}
        </Card.Body>
        {editModalIsOpen && <Backdrop onClick={closeModalHandler} />}
      </Card>
    </>
  );
};

export default Budget;
