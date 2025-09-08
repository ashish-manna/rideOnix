require("dotenv").config();
const express = require("express");
const connectDatabase = require("./config/database");
const userRouter = require("./routes/user");
const captainRouter = require("./routes/captain");
const cors = require("cors");

const PORT = process.env.PORT || 8000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/user", userRouter);
app.use("/captain", captainRouter);

app.get("/", (req, res) => {
  res.json(`Server is up and running...`);
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
