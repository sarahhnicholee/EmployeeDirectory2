const express = require("express");
const app = express();
const PORT = 3001;

app.use(express.json());

app.use("/api", require("./api/employees"));

app.use((req, res) => {
  res.status(404).send("Route not found.");
});

app.use((err, req, res) => {
  console.error(err);
  res.status(err.status ?? 500);
  res.json(err.message ?? "Something went wrong!");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});
