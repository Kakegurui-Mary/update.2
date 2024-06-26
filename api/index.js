import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();

//Find the issue debugging
// Middleware to log incoming requests
const logRequests = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
};


app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    //Picture is getting uploaded
    cb(null, "../public/upload") //public
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname)
  },
});

//const upload = multer({ dest: "./uploads/" }); //old
const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  //Datei Name wird in der db abgespeichert
  res.status(200).json(file.filename);
});

//Für debugg issue Use the logging middleware
app.use(logRequests);


app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.listen(8800, () => {
  console.log("Connected!");
});

/* import express from "express";
import recipeRoutes from "./routes/recipes.js"
import authRoutes from "./routes/auth.js"
import userRoutes from "./routes/users.js"
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express();
//Daten an die DB senden
app.use(express.json());
app.use(cookieParser());

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "../public/upload");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + file.originalname);
    },
  });

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/recipes", recipeRoutes);

app.listen(8800, ()=>{
    console.log("Connected!");
}); */