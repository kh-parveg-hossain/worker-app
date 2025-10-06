
import mongoose from "mongoose";

const WorkerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      required: true,
      default: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    },
    services: {
      type: String,
      required: true,
      enum: [
        "Cleaning",
        "Baby Care",
        "Governess",
        "Cook",
        "Elder Care",
        "Nurse",
        "Maternal and Newborn Care",
      ],
    },
    experience: {
      type: String,
      required: true,
    },
    religion: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
      min: 18,
      max: 70,
    },
    state: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const WorkerModel = mongoose.model("Worker", WorkerSchema);
export default WorkerModel;
