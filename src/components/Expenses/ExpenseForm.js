import React, { useState } from "react";
import { Button, Form, InputGroup, Row } from "react-bootstrap";
import Moment from "moment";
import { budgetApi } from "../Services/BudgetApi.js";

const ExpenseForm = (props) => {
  const isUpdate = props.isUpdate;
  let data = props.data;

  const [nameValue, setNameValue] = useState(isUpdate ? data.name : "");
  const [amountValue, setAmountValue] = useState(isUpdate ? data.amount : "");
  const [dueDateValue, setDueDateValue] = useState(
    isUpdate ? data.dueDate : Moment(new Date()).format("YYYY-MM-DD")
  );

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onCancel();

    if (isUpdate) {
      data.name = nameValue;
      data.amount = amountValue;
      data.dueDate = dueDateValue;
      budgetApi.updateExpense(data);
    } else {
      data = {
        budgetId: props.budgetId,
        name: nameValue,
        amount: amountValue,
        dueDate: dueDateValue,
      };
      budgetApi.postExpense(data);
    }
    props.refresh();
  };

  const onChangeHandler = (event) => {
    let fieldName = event.target.name;
    switch (fieldName) {
      case "expenseName":
        setNameValue(event.target.value);
        break;
      case "expenseAmount":
        setAmountValue(event.target.value);
        break;
      case "expenseDueDate":
        setDueDateValue(event.target.value);
        break;
      default:
    }
  };

  return (
    <div
      style={{
        paddingLeft: "50px",
        paddingRight: "50px",
      }}
    >
      <div style={{ padding: "10px", textAlign: "center" }}>
        {isUpdate ? <h3>Update Expense</h3> : <h3>Add Expense</h3>}
      </div>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group style={{ padding: "10px" }}>
          <Form.Label>Expense Name</Form.Label>
          <Form.Control
            type="text"
            name="expenseName"
            id={`expenseName`}
            placeholder={isUpdate ? "Enter expense name" : ""}
            value={nameValue}
            onChange={onChangeHandler}
          />
        </Form.Group>
        <Form.Group style={{ padding: "10px" }}>
          <Form.Label>Expense Amount</Form.Label>
          <InputGroup>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="text"
              name="expenseAmount"
              id={`expenseAmount`}
              value={amountValue}
              onChange={onChangeHandler}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group style={{ padding: "10px" }}>
          <Form.Label>Expense Due Date</Form.Label>
          <Form.Control
            type="date"
            name="expenseDueDate"
            id={`expenseDueDate`}
            value={dueDateValue}
            onChange={onChangeHandler}
          />
        </Form.Group>
        <Row style={{ justifyContent: "center" }}>
          <Button
            onClick={props.onCancel}
            style={{ width: "200px", margin: "10px" }}
          >
            Cancel
          </Button>
          <Button type="submit" style={{ width: "200px", margin: "10px" }}>
            {isUpdate ? "Update" : "Submit"}
          </Button>
        </Row>
      </Form>
    </div>
  );
};

export default ExpenseForm;
