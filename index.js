const express = require("express");
const app = express();
require("dotenv").config();
require("./config/db").connectToDb();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", require("./routes/index"));

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
