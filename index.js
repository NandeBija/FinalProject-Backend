const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./Routes/auth");
const userRoute = require("./Routes/UserRouter");
const postRouter = require("./Routes/PostRouter");
const bookingRouter = require("./Routes/BookingRouter");
const contactRouter = require("./Routes/ContactRouter"); 
const nodemailer = require("nodemailer");
const photographerRouter = require("./Routes/PhotographerRouter");
const photographerProfileRouter = require("./Routes/PhotographerProfileRouter");

const { getPost, getUser } = require("./Middleware/find");
const path = require("path");
dotenv.config();

const app = express();


// Setting up MongoDB connection
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to database"));




app.set("port", process.env.PORT || 2088);
app.use(express.json());
app.use(cors());
// app.use(bodyParser.json())

app.use("/auth", authRoute);
app.use("/users", userRoute);
app.use("/posts", postRouter);
app.use("/contact", contactRouter);
app.use("/photographers", photographerRouter);
app.use("/profile", photographerProfileRouter);
app.use("/booking", bookingRouter);

// CORS headers
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

app.listen(app.get("port"), (server) => {
  console.info(`Server listen on port ${app.get("port")}`);
  console.info("Press CTRL + C to close the server");
});
