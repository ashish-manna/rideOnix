const mongoose = require("mongoose");

const connectDatabase = async () => {
  await mongoose.connect(process.env.MONGODB_CONNECTION_URL);
};

module.exports = connectDatabase;
