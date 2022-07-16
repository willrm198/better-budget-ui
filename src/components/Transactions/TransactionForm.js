import React, { useState } from "react";
import { Button, Form, InputGroup, Row } from "react-bootstrap";
import Moment from "moment";
import { budgetApi } from "../Services/BudgetApi.js";

const AccountForm = (props) => {
  const isUpdate = props.isUpdate;
  let data = props.data;

  const [typeValue, setTypeValue] = useState(
    isUpdate ? data.transactionType : "Withdrawal"
  );
  const [dateValue, setDateValue] = useState(
    isUpdate ? data.transactionDate : Moment(new Date()).format("YYYY-MM-DD")
  );
  const [categoryValue, setCategoryValue] = useState(
    isUpdate ? data.category : "Personal"
  );
  const [descriptionValue, setDescriptionValue] = useState(
    isUpdate ? data.description : ""
  );
  const [amountValue, setAmountValue] = useState(isUpdate ? data.amount : "");

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onCancel();

    if (isUpdate) {
      data.transactionType = typeValue;
      data.transactionDate = dateValue;
      data.category = categoryValue;
      data.description = descriptionValue;
      data.amount = amountValue;
      budgetApi.updateTransaction(data);
    } else {
      data = {
        budgetId: props.budgetId,
        transactionType: typeValue,
        transactionDate: dateValue,
        category: categoryValue,
        description: descriptionValue,
        amount: amountValue,
      };
      budgetApi.postTransaction(data);
    }
    props.refresh();
  };

  const onChangeHandler = (event) => {
    let fieldName = event.target.name;
    switch (fieldName) {
      case "trxType":
        setTypeValue(event.target.value);
        break;
      case "trxDate":
        setDateValue(event.target.value);
        break;
      case "trxCategory":
        setCategoryValue(event.target.value);
        break;
      case "trxDescription":
        setDescriptionValue(event.target.value);
        break;
      case "trxAmount":
        setAmountValue(event.target.value);
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
        {isUpdate ? <h3>Update Transaction</h3> : <h3>Add Transaction</h3>}
      </div>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group style={{ padding: "10px" }}>
          <Form.Label>Transaction Type</Form.Label>
          <Form.Select
            name="trxType"
            id={`trxType`}
            value={typeValue}
            onChange={onChangeHandler}
          >
            <option value="Deposit">Deposit</option>
            <option value="Withdrawal">Withdrawal</option>
          </Form.Select>
        </Form.Group>
        <Form.Group style={{ padding: "10px" }}>
          <Form.Label>Transaction Date</Form.Label>
          <Form.Control
            type="date"
            name="trxDate"
            id={`trxDate`}
            value={dateValue}
            onChange={onChangeHandler}
          />
        </Form.Group>
        <Form.Group style={{ padding: "10px" }}>
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="trxCategory"
            id={`trxCategory`}
            value={categoryValue}
            onChange={onChangeHandler}
          >
            <option value="Personal">Personal</option>
            <option value="Expense">Expense</option>
            <option value="Gas">Gas</option>
            <option value="Grocery">Grocery</option>
            <option value="Restaraunt">Restaraunt</option>
            <option value="Other">Other</option>
          </Form.Select>
        </Form.Group>
        <Form.Group style={{ padding: "10px" }}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            name="trxDescription"
            id={`trxDescription`}
            placeholder={isUpdate ? "Enter description" : ""}
            value={descriptionValue}
            onChange={onChangeHandler}
          />
        </Form.Group>
        <Form.Group style={{ padding: "10px" }}>
          <Form.Label>Transaction Amount</Form.Label>
          <InputGroup>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="text"
              name="trxAmount"
              id={`trxAmount`}
              value={amountValue}
              onChange={onChangeHandler}
            />
          </InputGroup>
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

export default AccountForm;
