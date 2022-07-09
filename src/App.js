import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Budget from "./components/Budgets/Budget.js";
import BudgetForm from "./components/Budgets/BudgetForm";
import BudgetsList from "./components/Budgets/BudgetsList";
import Home from "./components/Home/Home.js";
import NavBar from "./components/Navigation/NavBar.js";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router basename="/">
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/createBudget" element={<BudgetForm />} />
        <Route path="/myBudgets" element={<BudgetsList />} />
        <Route path="/budget" element={<Budget />} />
      </Routes>
    </Router>
  );
}

export default App;
