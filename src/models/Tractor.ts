import mongoose, { Schema, models, model } from "mongoose";

const TractorSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    ownerName: {
      type: String,
      required: true,
    },

    tractorName: {
      type: String,
      required: true,
    },

    tractorNumber: {
      type: String,
      required: true,
    },

    serviceType: {
      type: String,
      required: true,
    },

    serviceRate: {
      type: Number,
      required: true,
    },

    contactNumber: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "Available",
    },
  },
  {
    timestamps: true,
  }
);

export default models.Tractor ||
  model("Tractor", TractorSchema);