import React from "react";
import { Button, Col, Form, InputGroup, Table } from "react-bootstrap";

const Expenses = (props) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Expense Name</th>
          <th>Due Date</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {props.expenseList.map((val, idx) => {
          let expenseName = `expenseName-${idx}`,
            expenseDueDate = `dueDate-${idx}`,
            expenseAmount = `amount-${idx}`;
          return (
            <tr className="mx-2" key={val.index}>
              <td>
                <Form.Group as={Col}>
                  <Form.Control
                    type="text"
                    name="expenseName"
                    data-id={idx}
                    id={expenseName}
                    placeholder="Enter expense name"
                  />
                </Form.Group>
              </td>
              <td>
                <Form.Group as={Col}>
                  <Form.Control
                    type="date"
                    name="expenseDueDate"
                    data-id={idx}
                    id={expenseDueDate}
                  />
                </Form.Group>
              </td>
              <td>
                <Form.Group as={Col}>
                  <InputGroup>
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="expenseAmount"
                      data-id={idx}
                      id={expenseAmount}
                    />
                  </InputGroup>
                </Form.Group>
              </td>
              <td>
                <Form.Group as={Col} xs={1}>
                  <Button variant="danger" onClick={() => props.delete(val)}>
                    X
                  </Button>
                </Form.Group>
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default Expenses;
