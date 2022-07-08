import React from "react";
import { Button, Col, Form, InputGroup, Table } from "react-bootstrap";

const Accounts = (props) => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Account Name</th>
          <th>Limit</th>
          <th>Balance</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {props.accountList.map((val, idx) => {
          let accountName = `accountName-${idx}`,
            accountLimit = `limit-${idx}`,
            accountBalance = `balance-${idx}`,
            accountType = `type-${idx}`;
          return (
            <tr className="mx-2" key={val.index}>
              <td>
                <Form.Group as={Col}>
                  <Form.Control
                    type="text"
                    name="accountName"
                    data-id={idx}
                    id={accountName}
                    placeholder="Enter account name"
                  />
                </Form.Group>
              </td>
              <td>
                <Form.Group as={Col}>
                  <InputGroup>
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="accountLimit"
                      data-id={idx}
                      id={accountLimit}
                    />
                  </InputGroup>
                </Form.Group>
              </td>
              <td>
                <Form.Group as={Col}>
                  <InputGroup>
                    <InputGroup.Text>$</InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="accountBalance"
                      data-id={idx}
                      id={accountBalance}
                    />
                  </InputGroup>
                </Form.Group>
              </td>
              <td>
                <Form.Group>
                  <Form.Select
                    name="accountType"
                    data-id={idx}
                    id={accountType}
                  >
                    <option value="Bank">Bank</option>
                    <option value="Credit_Card">Credit Card</option>
                    <option value="Saving_Fund">Savings</option>
                  </Form.Select>
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

export default Accounts;
