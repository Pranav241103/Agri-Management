import mongoose, {
  Schema,
  models,
  model,
} from "mongoose";

const DairySchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    milkType: {
      type: String,
      required: true,
    },

    litre: {
      type: Number,
      required: true,
    },

    milkRate: {
      type: Number,
      required: true,
    },

    totalAmount: {
      type: Number,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Dairy ||
  model("Dairy", DairySchema);