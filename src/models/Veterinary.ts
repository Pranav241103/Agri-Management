import mongoose, {
  Schema,
  models,
  model,
} from "mongoose";

const VeterinarySchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },

    doctorName: {
      type: String,
      required: true,
    },

    serviceName: {
      type: String,
      required: true,
    },

    serviceRate: {
      type: Number,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },

    whatsappNumber: {
      type: String,
      required: true,
    },

    experience: {
      type: Number,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default models.Veterinary ||
  model(
    "Veterinary",
    VeterinarySchema
  );