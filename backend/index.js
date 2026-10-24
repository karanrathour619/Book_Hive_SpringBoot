const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path"); // ✅ needed for serving static files
const port = process.env.PORT || 5000;
require("dotenv").config();

const fs = require("fs");
// const path = require("path");

// Ensure uploads folder exists (important for Render deployment)
const uploadPath = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// middleware
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://bookhive-book-selling.vercel.app",
      "https://bookhive-frontend-qo4sdawr2-karan-singh-rathours-projects.vercel.app",
    ],
    credentials: true,
  })
);
app.set("trust proxy", 1);

// ✅ Serve static folder for uploaded images
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// routes
const bookRoutes = require("./src/books/book.route");
const orderRoutes = require("./src/orders/order.route");
const userRoutes = require("./src/users/user.route");
const adminRoutes = require("./src/stats/admin.stats");

app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/auth", userRoutes);
app.use("/api/admin", adminRoutes);

async function main() {
  await mongoose.connect(process.env.DB_URL);
  app.use("/", (req, res) => {
    res.send("Book Store Server is running!");
  });
}

main()
  .then(() => console.log("✅ MongoDB connected successfully!"))
  .catch((err) => console.log("❌ MongoDB connection failed:", err));

app.listen(port, () => {
  console.log(`🚀 Server running on port ${port}`);
});
