// const express = require("express");
// const dotenv = require("dotenv");
// const cors = require("cors");
// const mongoose = require("mongoose");

// dotenv.config();
// const app = express();

// app.use(express.json());
// app.use(cors());

// // ✅ Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch(err => console.error("❌ MongoDB Connection Error:", err));

// // Import Routes
// const authRoutes = require("./routes/authRoutes");
// const protectedRoutes = require("./routes/protectedRoutes");

// // ✅ Mount routes correctly
// app.use("/api/auth", authRoutes);
// app.use("/api/protected", protectedRoutes);

// // Default Route
// app.get("/", (req, res) => {
//   res.send("🚀 Server is running...");
// });

// // Start Server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

// Import Routes
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");

// ✅ Mount routes correctly
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);

// Default Route
app.get("/", (req, res) => {
  res.send("🚀 Server is running...");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
