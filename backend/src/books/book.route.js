const express = require("express");
const Book = require("./book.model");
const {
  postABook,
  getAllBooks,
  getSingleBook,
  UpdateBook,
  deleteABook,
} = require("./book.controller");

const verifyAdminToken = require("../middleware/verifyAdminToken");
const upload = require("../middleware/upload"); // ✅ import multer config

const router = express.Router();

// frontend => backend server => controller => book schema  => database => send to server => back to the frontend
// post = when submit something fronted to db
// get =  when get something back from db
// put/patch = when edit or update something
// delete = when delete something

// 📌 Post a book (with image upload)
router.post(
  "/create-book",
  verifyAdminToken,
  upload.single("coverImage"), // ✅ Multer middleware
  postABook
);

// 📌 Get all books
router.get("/", getAllBooks);

// 📌 Single book endpoint
router.get("/:id", getSingleBook);

// 📌 Update a book endpoint
router.put(
  "/edit/:id",
  verifyAdminToken,
  upload.single("coverImage"), // ✅ allow updating cover image too
  UpdateBook
);

// 📌 Delete a book
router.delete("/:id", verifyAdminToken, deleteABook);

module.exports = router;
