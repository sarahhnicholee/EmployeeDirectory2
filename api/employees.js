const express = require("express");
const router = express.Router();
let employees = require("../data/employees");
const { v4: uuidv4 } = require("uuid");

// const employees = require("../data/employees");

router.get("/", (req, res) => {
  res.send("Hello employees!");
});

router.get("/employees", (req, res) => {
  res.json(employees);
});

router.get("/employees/random", (req, res) => {
  const i = Math.floor(Math.random() * employees.length);
  res.json(employees[i]);
});
router.get("/employees/:id", (req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);
  if (employee) {
    res.json(employee);
  } else {
    res.status(404).send(`There is no employee with id ${id}.`);
  }
});

router.use((req, res, next) => {
  next();
  const token = req.header("authorization");
  if (token) {
    next();
  } else {
    res.status(403).send("Please log in");
  }
});

router.post("/employees", (req, res, next) => {
  const { name } = req.body;
  employees.push({ id: uuidv4(), name });
  res.send(employees);
});

module.exports = router;
