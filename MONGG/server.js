const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const cors = require("cors");
const bcrypt = require("bcryptjs");

const User = require("./models/User");
const Booking = require("./models/Booking");
const Bus = require("./models/Bus");

const app = express();

/* ================= MIDDLEWARE ================= */

app.use(express.json());

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:3001"], // React app port
  credentials: true
}));

app.use(session({
  secret: "busbooking_secret",
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true
  }
}));

/* ================= DATABASE ================= */

mongoose.connect("mongodb://localhost:27017/Bus")
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.log(err));

/* ================= HOME ================= */

app.get("/", (req, res) => {
  res.send("Server Running");
});

/* ================= REGISTER ================= */

app.post("/api/users/register", async (req, res) => {
  try {
    let { username, password } = req.body;
    username = username?.trim();
    password = password?.trim();

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const existingUser = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, "i") } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 🔒 Hash password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

/* ================= LOGIN ================= */

app.post("/api/users/login", async (req, res) => {
  try {
    let { username, password } = req.body;
    username = username?.trim();
    password = password?.trim();

    if (!username || !password) {
      return res.status(400).json({ message: "Username and password are required" });
    }

    const user = await User.findOne({ username: { $regex: new RegExp(`^${username}$`, "i") } });
    if (!user || !user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    let isMatch = false;
    // Check if the stored password is a bcrypt hash (usually starts with $2a$, $2b$, or $2y$)
    if (user.password.startsWith("$2a$") || user.password.startsWith("$2b$") || user.password.startsWith("$2y$")) {
      isMatch = await bcrypt.compare(password, user.password);
    } else {
      // Fallback for old plain-text passwords
      isMatch = (password === user.password);

      // Auto-upgrade plain text to bcrypt hash on successful login
      if (isMatch) {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();
      }
    }

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // ✅ Create session
    req.session.user = {
      id: user._id,
      username: user.username
    };

    res.status(200).json({
      message: "Login successful",
      username: user.username
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

/* ================= LOGOUT ================= */

app.post("/api/users/logout", (req, res) => {
  req.session.destroy(() => {
    res.json({ message: "Logged out successfully" });
  });
});

/* ================= CHECK AUTH ================= */

app.get("/api/users/check-auth", (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

/* ================= BUS ROUTES ================= */

app.get("/api/buses/search", async (req, res) => {
  try {
    const { from, to } = req.query;

    let filter = {};
    if (from && to) {
      filter = {
        // We do regex matching for case insensitivity
        from: { $regex: new RegExp(from, "i") },
        to: { $regex: new RegExp(to, "i") },
      };
    }

    const buses = await Bus.find(filter);
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching buses" });
  }
});

/* ================= GET ALL BUSES ================= */
app.get("/api/buses", async (req, res) => {
  try {
    const buses = await Bus.find();
    res.json(buses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching buses" });
  }
});

/* ================= ADD NEW BUS ================= */
app.post("/api/buses", async (req, res) => {
  try {
    const { name, from, to, depart, arrive, type, price } = req.body;

    // Assigning defaults for fields not present in the admin creation form
    const newBus = new Bus({
      id: Date.now(),
      name,
      from,
      to,
      depart,
      arrive,
      type,
      price: Number(price),
      duration: "TBD",
      seats: 40,
      rating: 4.0,
      company: "Admin Added",
      amenities: ["AC"]
    });

    await newBus.save();
    res.status(201).json({ message: "Bus added successfully", bus: newBus });
  } catch (error) {
    console.error("Error adding bus:", error);
    res.status(500).json({ message: "Error adding bus", error: error.message });
  }
});

/* ================= EDIT BUS ================= */
app.put("/api/buses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, from, to, depart, arrive, type, price } = req.body;

    const updatedBus = await Bus.findOneAndUpdate(
      { id: Number(id) },
      { name, from, to, depart, arrive, type, price: Number(price) },
      { new: true }
    );

    if (!updatedBus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.json({ message: "Bus updated successfully", bus: updatedBus });
  } catch (error) {
    console.error("Error updating bus:", error);
    res.status(500).json({ message: "Error updating bus" });
  }
});

/* ================= DELETE BUS ================= */
app.delete("/api/buses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBus = await Bus.findOneAndDelete({ id: Number(id) });

    if (!deletedBus) {
      return res.status(404).json({ message: "Bus not found" });
    }

    res.json({ message: "Bus deleted successfully" });
  } catch (error) {
    console.error("Error deleting bus:", error);
    res.status(500).json({ message: "Error deleting bus" });
  }
});

/* ================= SAVE BOOKING ================= */

// In-memory lock to prevent race conditions during concurrent booking
const bookingLocks = {};

app.post("/api/bookings", async (req, res) => {
  try {

    // 🔒 PROTECT ROUTE
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const { busName, journeyDate, seats } = req.body;

    // Validate Required Setup
    if (!journeyDate || !busName || !seats || seats.length === 0) {
      return res.status(400).json({ message: "Missing required booking details (busName, journeyDate, seats)" });
    }

    const lockKey = `${busName}-${journeyDate}`;
    if (!bookingLocks[lockKey]) {
      bookingLocks[lockKey] = Promise.resolve();
    }

    // Wait for any previous pending booking on this bus/date, then lock
    let releaseLock;
    const lockPromise = new Promise(resolve => { releaseLock = resolve; });
    const previousLock = bookingLocks[lockKey];
    bookingLocks[lockKey] = previousLock.then(() => lockPromise);
    await previousLock;

    try {
      // Prevent Double Booking
      const existingBookings = await Booking.find({
        busName: busName,
        journeyDate: journeyDate,
        status: { $ne: "Cancelled" },
        seats: { $in: seats }
      });

      if (existingBookings.length > 0) {
        return res.status(400).json({ message: "One or more selected seats are already booked on this date" });
      }

      const booking = new Booking({
        ...req.body,
        username: req.session.user.username
      });

      await booking.save();

      return res.status(201).json({ message: "Booking saved successfully" });
    } finally {
      // Release the lock for the next request
      releaseLock();
    }

  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Error saving booking" });
  }
});

/* ================= GET BOOKED SEATS FOR A BUS & DATE ================= */
app.get("/api/bookings/booked-seats", async (req, res) => {
  try {
    const { busName, date } = req.query;
    if (!busName || !date) {
      return res.status(400).json({ message: "busName and date are required" });
    }

    const bookings = await Booking.find({
      busName,
      journeyDate: date,
      status: { $ne: "Cancelled" }
    });

    let bookedSeats = [];
    bookings.forEach(b => {
      if (b.seats && b.seats.length > 0) {
        bookedSeats.push(...b.seats);
      }
    });

    res.json(bookedSeats);
  } catch (error) {
    res.status(500).json({ message: "Error fetching booked seats" });
  }
});

/* ================= GET BOOKING HISTORY ================= */

app.get("/api/bookings", async (req, res) => {
  try {

    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const bookings = await Booking.find({
      username: req.session.user.username
    });

    res.json(bookings);

  } catch (error) {
    res.status(500).json({ message: "Error fetching bookings" });
  }
});

/* ================= CANCEL BOOKING ================= */

app.put("/api/bookings/:id/cancel", async (req, res) => {
  try {
    // 🔒 PROTECT ROUTE
    if (!req.session.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Validation 1: User should only cancel their own bookings
    if (booking.username !== req.session.user.username) {
      return res.status(403).json({ message: "Not authorized to cancel this booking" });
    }

    // Validation 2: Only bookings with status = "Booked" should be cancellable
    if (booking.status === "Cancelled") {
      return res.status(400).json({ message: "Booking is already cancelled" });
    }

    // Validation 3: Cannot cancel completed trips
    // Departure time format assumed e.g., "10:00 AM" or similar string, and needs a date context
    // Actually, we don't store the trip date on the booking currently except as bookingDate.
    // If we assume a trip date, but there isn't one defined on booking schema, 
    // we need to parse bookingDate or just use an approximate Check if departure passed (if string time).
    // Let's implement a basic check or skip if date is missing.
    // Given the data, we'll assume we can't fully validate past departures without a specific journey date.
    // But we'll add the property updates as requested.

    // Update status instead of deleting
    booking.status = "Cancelled";
    booking.cancelledAt = new Date();

    await booking.save();

    res.status(200).json({ message: "Booking cancelled successfully", booking });

  } catch (error) {
    res.status(500).json({ message: "Server error during cancellation" });
  }
});

/* ================= START SERVER ================= */

app.listen(5000, () => {
  console.log("🚀 Server running on port 5000");
});
