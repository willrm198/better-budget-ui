import React, { useEffect, useState } from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Moment from "moment";

import { budgetApi } from "../Services/BudgetApi.js";

const BudgetsList = (props) => {
  const [budgetList, setBudgetList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    budgetApi.getBudgets().then((response) => {
      let list = response.data;
      list.forEach((budget) => {
        budget.startDate = Moment(new Date(budget.startDate)).format(
          "MM/DD/YYYY"
        );
        budget.endDate = Moment(new Date(budget.endDate)).format("MM/DD/YYYY");
      });
      setBudgetList(list);
      setIsLoading(false);
    });
  }, []);

  const itemOnClickHandler = (id) => {
    console.log(`View budget with this id: ${id}`);
    navigate(`/budget/${id}`);
  };

  return (
    <Card
      style={{ marginLeft: "100px", marginRight: "100px", minHeight: "500px" }}
    >
      <Card.Title
        style={{ textAlign: "center", fontSize: "35px", marginTop: "50px" }}
      >
        Your Budgets
      </Card.Title>
      <Card.Body>
        {isLoading ? (
          <p>Loading</p>
        ) : (
          <Table>
            <thead>
              <tr>
                <th>Budget Dates</th>
                <th>Budget Type</th>
              </tr>
            </thead>
            <tbody>
              {budgetList.map((budget, idx) => {
                let dateRange = `${budget.startDate} - ${budget.endDate}`,
                  budgetType = budget.budgetType;
                let dates = `budgetDateRange-${idx}`,
                  type = `budgetType-${idx}`,
                  btnId = `viewBudget-${idx}`;
                return (
                  <tr key={budget.id}>
                    <td name="budgetDateRange" id={dates} data-id={idx}>
                      {dateRange}
                    </td>
                    <td name="budgetType" id={type} data-id={idx}>
                      {budgetType}
                    </td>
                    <td name="viewBudgetBtn" id={btnId} data-id={idx}>
                      <Button
                        variant="secondary"
                        onClick={() => itemOnClickHandler(budget.id)}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        )}
      </Card.Body>
    </Card>
  );
};

export default BudgetsList;
