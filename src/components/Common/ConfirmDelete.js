import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import { budgetApi } from "../Services/BudgetApi.js";

const ConfirmDelete = (props) => {
  let name = props.name;
  let id = props.item.id;

  const deleteHandler = () => {
    switch (name) {
      case "expense":
        budgetApi.deleteExpense(id);
        break;
      case "account":
        budgetApi.deleteAccount(id);
        break;
      case "transaction":
        budgetApi.deleteTransaction(id);
        break;
      default:
    }
    console.log("deleted");
    props.refresh();
  };

  return (
    <div>
      <Row style={{ textAlign: "center" }}>
        <p>Are you sure you want to delete?</p>
        <Col style={{ textAlign: "right" }}>
          <Button style={{ width: "100px" }} onClick={props.cancel}>
            Cancel
          </Button>
        </Col>
        <Col style={{ textAlign: "left" }}>
          <Button style={{ width: "100px" }} onClick={deleteHandler}>
            Delete
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default ConfirmDelete;
