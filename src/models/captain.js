const mongoose = require("mongoose");

const captainSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      maxLength: 40,
      minLength: 4,
      trim: true,
    },
    lastName: {
      type: String,
      maxLength: 40,
      minLength: 4,
      trim: true,
      default: null,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    socketId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "inactive",
    },
    vehicle: {
      color: {
        type: String,
        minLength: 3,
        required: true,
      },
      plate: {
        type: String,
        required: true,
        minLength: 3,
      },
      capacity: {
        type: Number,
        required: true,
        min: 1,
      },
      vehicleType: {
        type: String,
        enum: ["moto", "auto", "car"],
        required: true,
      },
    },
    location: {
      lat: {
        type: Number,
      },
      long: {
        type: Number,
      },
    },
  },
  { timestamps: true }
);

const Captain = mongoose.model("Captain", captainSchema);

module.exports = Captain;
