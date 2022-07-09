import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import Moment from "moment";
import { Button, Card, Col, Form, FormSelect, Row } from "react-bootstrap";
import Expenses from "../Expenses/Expenses.js";
import Accounts from "../Accounts/Accounts.js";
import { budgetApi } from "../Services/BudgetApi.js";

import "react-datepicker/dist/react-datepicker.css";

const BudgetForm = (props) => {
  const [budgetType, setBudgetType] = useState("Bi-Weekly");
  const [startDate, setStartDate] = useState(new Date());
  const [displayFrom, setDisplayFrom] = useState("");
  const [displayTo, setDisplayTo] = useState("");
  const [isDateSet, setIsDateSet] = useState(false);
  const [expenseData, setExpenseData] = useState([
    {
      index: Math.random(),
      expenseName: "",
      expenseDueDate: "",
      expenseAmount: "",
    },
  ]);
  const [accountData, setAccountData] = useState([
    {
      index: Math.random(),
      accountName: "",
      accountLimit: "",
      accountBalance: "",
      accountType: "",
    },
  ]);
  const navigate = useNavigate();
  let typeHolder;
  let startDtHolder;

  const onDateChange = (date) => {
    if (date != null) {
      setStartDate(date);
      startDtHolder = date;
      rangeCalculator();
    }
  };

  const rangeCalculator = () => {
    let start = getStartDt();
    let type = getType();
    let end;
    switch (type) {
      case "DAILY":
        end = addDays(start, 1);
        break;
      case "BI_WEEKLY":
        end = addDays(start, 14);
        break;
      case "MONTHLY":
        end = addDays(start, 28);
        break;
      case "YEARLY":
        end = addDays(start, 365);
        break;
      default:
        break;
    }

    let from = Moment(start).format("MM/DD/YYYY").toString();
    let to = Moment(end).format("MM/DD/YYYY").toString();
    setDisplayFrom(from);
    setDisplayTo(to);
    setIsDateSet(true);
  };

  function addDays(date, days) {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    console.log("New date: " + result);
    return result;
  }

  function getStartDt() {
    if (startDtHolder == null) {
      return startDate;
    }
    return startDtHolder;
  }

  function getType() {
    if (typeHolder == null) {
      return budgetType;
    }
    return typeHolder;
  }

  const onTypeChange = (event) => {
    console.log("on type change");
    let type = event.target.value;
    console.log("type: " + type);
    typeHolder = type;
    setBudgetType(type);
    rangeCalculator();
  };

  const addExpenseHandler = (e) => {
    setExpenseData((prevState) => {
      return [
        ...prevState,
        {
          index: Math.random(),
          expenseName: "",
          expenseDueDate: "",
          expenseAmount: "",
        },
      ];
    });
  };

  const onAccountDeleteHandler = (index) => {
    setAccountData(accountData.filter((acc) => acc.index !== index.index));
  };

  const addAccountHandler = (e) => {
    setAccountData((prevState) => {
      return [
        ...prevState,
        {
          index: Math.random(),
          accountName: "",
          accountLimit: "",
          accountBalance: "",
          accountType: "",
        },
      ];
    });
  };

  const onExpenseDeleteHandler = (index) => {
    setExpenseData(expenseData.filter((exp) => exp.index !== index.index));
  };

  const formSubmissionHandler = (event) => {
    event.preventDefault();
    let request = {
      budget: {
        startDate: displayFrom,
        endDate: displayTo,
        budgetType: budgetType,
      },
      expenses: [...expenseData],
      accounts: [...accountData],
    };

    budgetApi.postBudget(request);

    navigate("/budget");
  };

  const formChangeHandler = (e) => {
    if (
      ["expenseName", "expenseDueDate", "expenseAmount"].includes(e.target.name)
    ) {
      let expenses = [...expenseData];
      expenses[e.target.dataset.id][e.target.name] = e.target.value;
    } else if (
      ["accountName", "accountLimit", "accountBalance", "accountType"].includes(
        e.target.name
      )
    ) {
      let accounts = [...accountData];
      accounts[e.target.dataset.id][e.target.name] = e.target.value;
    }
  };

  let expenseList = expenseData;
  let accountList = accountData;

  return (
    <Card
      className="mx-auto"
      bg="light"
      style={{ width: "75%", margin: "20px", minHeight: "400px" }}
    >
      <Card.Title
        className="text-center"
        style={{ margin: "20px", fontWeight: "750" }}
      >
        Create a New Budget
      </Card.Title>

      <Card.Body>
        <Form onSubmit={formSubmissionHandler} onChange={formChangeHandler}>
          <Row>
            <Col
              style={{
                paddingRight: "10%",
                display: "flex",
                justifyContent: "right",
              }}
            >
              <div>
                <label htmlFor="budgetType">Type</label>
                <FormSelect
                  style={{ width: "200px" }}
                  id="budgetType"
                  onChange={onTypeChange}
                  defaultValue="Bi-Weekly"
                >
                  <option value="DAILY">Daily</option>
                  <option value="BI_WEEKLY">Bi-Weekly</option>
                  <option value="MONTHLY">Monthly</option>
                  <option value="YEARLY">Yearly</option>
                </FormSelect>
              </div>
            </Col>
            <Col style={{ paddingLeft: "10%" }}>
              <div style={{ width: "200px" }}>
                <div>
                  {isDateSet ? (
                    <label>{displayFrom + " - " + displayTo}</label>
                  ) : (
                    <label>Chose Start Date</label>
                  )}
                </div>
                <DatePicker
                  className="form-control"
                  style={{ width: "100px" }}
                  selected={startDate}
                  onChange={(date) => onDateChange(date)}
                  value={startDate}
                />
              </div>
            </Col>
          </Row>
          <hr />
          <Row className="my-3">
            <Col
              style={{
                paddingLeft: "10%",
                display: "flex",
                justifyContent: "left",
              }}
            >
              <Card.Subtitle style={{ padding: "10px" }}>
                Expenses
              </Card.Subtitle>
            </Col>
            <Col
              style={{
                paddingRight: "10%",
                display: "flex",
                justifyContent: "right",
              }}
            >
              <div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={addExpenseHandler}
                >
                  Add Expense
                </Button>
              </div>
            </Col>
          </Row>
          <Expenses
            add={addExpenseHandler}
            delete={onExpenseDeleteHandler.bind(this)}
            expenseList={expenseList}
          />
          <hr />
          <Row className="my-3">
            <Col
              style={{
                paddingLeft: "10%",
                display: "flex",
                justifyContent: "left",
              }}
            >
              <Card.Subtitle style={{ padding: "10px" }}>
                Accounts
              </Card.Subtitle>
            </Col>
            <Col
              style={{
                paddingRight: "10%",
                display: "flex",
                justifyContent: "right",
              }}
            >
              <div>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={addAccountHandler}
                >
                  Add Account
                </Button>
              </div>
            </Col>
          </Row>
          <Accounts
            add={addAccountHandler}
            delete={onAccountDeleteHandler.bind(this)}
            accountList={accountList}
          />
          <hr />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
            }}
          >
            <Button type="submit">Create Budget</Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default BudgetForm;
