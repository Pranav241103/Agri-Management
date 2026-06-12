import mongoose, { Schema, models, model } from "mongoose";

const FertilizerSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    fertilizerName: {
      type: String,
      required: true,
    },

    fertilizerType: {
      type: String,
      required: true,
    },

    companyName: {
      type: String,
      required: true,
    },

    rate: {
      type: Number,
      required: true,
    },

    quantity: {
      type: Number,
      required: true,
    },

    totalValue: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Fertilizer ||
  model("Fertilizer", FertilizerSchema);