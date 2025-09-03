require("dotenv").config();
const express = require("express");
const connectDatabase = require("./config/database");

const PORT = process.env.PORT || 8000;
const app = express();

app.get("/", (req, res) => {
  res.json(`Root of server...`);
});

connectDatabase()
  .then(() => {
    console.log(`Database connected successfully...`);
    app.listen(PORT, () => {
      console.log(`Sever is listening on PORT:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(`messate:${err}`);
  });
