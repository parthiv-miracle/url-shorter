const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
require("./config/db").connectToDb();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Authorization",
    ],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", require("./routes/index"));

const PORT = process.env.PORT || 5656;

app.get("/", (req, res) => {
  res.send("Welcome to the server");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
