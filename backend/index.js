const connectToMongo = require("./db");
const express = require("express");
require("dotenv").config();
const multer = require("multer");
var cors = require('cors');
const Data = require("./models/Data");
const { body, validationResult } = require("express-validator");

connectToMongo();

const app = express();
const port = process.env.PORT ;

app.use(cors());
app.use(express.json());
// app.use("/uploads", express.static("uploads"));


// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads"); // Folder to store uploaded files
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname); // Unique filenames
//   },
// });

// const upload = multer({ storage });

// app.post(
//   "/api/form",
//   upload.array("images"), 
//   [body("name", "Enter a valid name").isLength({ min: 2 })],
//   async (req, res) => {
//     try {
//       const { name, socialHandle } = req.body;

//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
//       // console.log("Uploaded files:", req.files);
      
//       const fileData = req.files.map((file) => ({
//         path: file.path,
//         filename: file.filename,
//       }));
      
//       const newData = new Data({
//         name,
//         socialHandle,
//         images: fileData, // Save the array of uploaded images
//       });

//       // Save to database
//       const savedData = await newData.save();

//       res.status(201).json({
//         message: "Profile and images uploaded successfully",
//         data: savedData,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send({ error: "Server error: Unable to save data" });
//     }
//   }
// );


// app.get("/api/fetchallUser", async (req, res) => {
//   try {
//     const user = await Data.find();
//     res.json(user);
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).send("Internal server error");
//   }
// });

app.get("/", async (req, res) => {
  console.log("Server has been started");
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
