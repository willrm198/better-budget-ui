import React, { useState } from "react";
import { Button, Form, InputGroup, Row } from "react-bootstrap";
import { budgetApi } from "../Services/BudgetApi.js";

const AccountForm = (props) => {
  const isUpdate = props.isUpdate;
  let data = props.data;

  const [nameValue, setNameValue] = useState(isUpdate ? data.name : "");
  const [typeValue, setTypeValue] = useState(
    isUpdate ? data.accountType : "Bank"
  );
  const [limitValue, setLimitValue] = useState(
    isUpdate ? data.limitAmount : ""
  );
  const [balanceValue, setBalanceValue] = useState(
    isUpdate ? data.balance : ""
  );

  const onSubmitHandler = (event) => {
    event.preventDefault();
    props.onCancel();

    if (isUpdate) {
      data.name = nameValue;
      data.accountType = typeValue;
      data.limitAmount = limitValue;
      data.balance = balanceValue;
      budgetApi.updateAccount(data);
    } else {
      data = {
        budgetId: props.budgetId,
        name: nameValue,
        accountType: typeValue,
        limitAmount: limitValue,
        balance: balanceValue,
      };
      budgetApi.postAccount(data);
    }
    props.refresh();
  };

  const onChangeHandler = (event) => {
    let fieldName = event.target.name;
    switch (fieldName) {
      case "accountName":
        setNameValue(event.target.value);
        break;
      case "accountType":
        setTypeValue(event.target.value);
        break;
      case "accountLimit":
        setLimitValue(event.target.value);
        break;
      case "accountBalance":
        setBalanceValue(event.target.value);
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
        {isUpdate ? <h3>Update Acccount</h3> : <h3>Add Account</h3>}
      </div>
      <Form onSubmit={onSubmitHandler}>
        <Form.Group style={{ padding: "10px" }}>
          <Form.Label>Account Name</Form.Label>
          <Form.Control
            type="text"
            name="accountName"
            id={`accountName`}
            placeholder={isUpdate ? "Enter account name" : ""}
            value={nameValue}
            onChange={onChangeHandler}
          />
        </Form.Group>
        <Form.Group style={{ padding: "10px" }}>
          <Form.Label>Account Type</Form.Label>
          <Form.Select
            name="accountType"
            id={`accountType`}
            value={typeValue}
            onChange={onChangeHandler}
          >
            <option value="Bank">Bank</option>
            <option value="Credit_Card">Credit Card</option>
            <option value="Saving_Fund">Savings</option>
          </Form.Select>
        </Form.Group>
        <Form.Group style={{ padding: "10px" }}>
          <Form.Label>Account Limit</Form.Label>
          <InputGroup>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="text"
              name="accountLimit"
              id={`accountLimit`}
              value={limitValue}
              onChange={onChangeHandler}
            />
          </InputGroup>
        </Form.Group>
        <Form.Group style={{ padding: "10px" }}>
          <Form.Label>Account Balance</Form.Label>
          <InputGroup>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              type="text"
              name="accountBalance"
              id={`accountBalance`}
              value={balanceValue}
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
