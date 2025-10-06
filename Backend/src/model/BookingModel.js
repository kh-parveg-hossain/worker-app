import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  worker: { type: mongoose.Schema.Types.ObjectId, ref: "Worker", required: true },
  customerName: { type: String, required: true },
  customerPhone: { type: String, required: true },
  fullAddress: { type: String, required: true },
  date: { type: Date, required: true },
  status: { type: String, enum: ["Pending", "Confirmed", "Cancelled"], default: "Pending" },
}, { timestamps: true });

export default mongoose.model("Booking", bookingSchema);
