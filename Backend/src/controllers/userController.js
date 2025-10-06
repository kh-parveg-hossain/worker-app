import WorkerModel from "../model/Woker.js";
import BookingModel from "../model/BookingModel.js";
export const user = (req, res) => {
    res.send('User endpoint');
}


// Create Worker Profile
export const WorkerProfile = async (req, res) => {
  try {
    const { name, services, experience, religion, age, state, image } = req.body;

    // Basic validation
    if (!name || !services || !experience || !religion || !age || !state) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create new worker
    const newWorker = new WorkerModel({
      name,
      services,
      experience,
      religion,
      age,
      state,
      image: image || "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg", // default
    });

    await newWorker.save();

    res.status(201).json({
      message: "Worker profile created successfully",
      worker: newWorker,
    });
  } catch (error) {
    console.error("Error creating worker profile:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const ListServices = async (req, res) => {

    const services = await WorkerModel.find();
    res.json(services);
     
    
}

export const ListServicesByServiceName = async (req, res) => {
  try {
    const { serviceName } = req.params;

    if (!serviceName) {
      return res.status(400).json({ message: "Service name is required" });
    }

    // Case-insensitive search
    const workers = await WorkerModel.find({
      services: { $regex: new RegExp(serviceName, 'i') },
    });

    if (workers.length === 0) {
      return res.status(404).json({ message: `No workers found for ${serviceName}` });
    }

    res.status(200).json({
      message: "Workers fetched successfully",
      count: workers.length,
      workers,
    });
  } catch (error) {
    console.error("Error fetching workers:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export const bookService = async (req, res) => {
  try {
    const { workerId, customerName, customerPhone, fullAddress,date } = req.body;

    if (!workerId || !customerName || !customerPhone ||!fullAddress|| !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if worker exists
    const worker = await WorkerModel.findById(workerId);
    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    // Save booking
    const booking = new BookingModel({
      worker: workerId,
      customerName,
      customerPhone,
      fullAddress,
      date,
      status: "Pending", // default status
    });

    await booking.save();

    return res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// export const getWorkerBookings = async (req, res) => {
//   try {
//     const { workerId } = req.params;

//     // Find all bookings for this worker
//     const bookings = await BookingModel.find({ worker: workerId })
//       .populate("worker", "name")   // if worker is a reference in schema
//       .sort({ date: 1 });           // sort by date (upcoming first)

//     if (!bookings || bookings.length === 0) {
//       return res.status(404).json({ message: "No bookings found for this worker" });
//     }

//     res.status(200).json({
//       workerId,
//       name: bookings[0].worker?.name || "Unknown", // safe access
//       bookings
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

export const getWorkerById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("Worker ID requested:", id); // ✅ Check ID from URL
    const worker = await WorkerModel.findById(id);
    console.log("Worker fetched from DB:", worker); // ✅ Should show object

    if (!worker) {
      return res.status(404).json({ message: "Worker not found" });
    }

    res.status(200).json(worker);
  } catch (error) {
    console.error("Error fetching worker:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


     
  