const functions = require('firebase-functions');
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

//Different Routes
const wordRoute = require("./routes/wordRoute");
const favouriteRoute = require("./routes/favouriteRoute");
const rememberRoute = require("./routes/rememberRoute");
const unrememberRoute = require("./routes/unrememberRoute");
const notesRoute = require("./routes/notesRoute");
const contactRoute = require("./routes/contactRoute");
const storyRoute=require("./routes/storyRoute");
const seenRoute=require("./routes/seenRoute");
const subscriptionRoute=require("./routes/subscriptionRoute");
const paymentRoute=require("./routes/paymentRoute");

// Loading environment variables from .env file
dotenv.config();

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1/word", wordRoute);
app.use("/api/v1/favourite", favouriteRoute);
app.use("/api/v1/remember", rememberRoute);
app.use("/api/v1/unremember", unrememberRoute);
app.use("/api/v1/notes", notesRoute);
app.use("/api/v1/contact", contactRoute);
app.use("/api/v1/story", storyRoute);
app.use("/api/v1/seen", seenRoute);
app.use("/api/v1/subscription",subscriptionRoute);
app.use("/api/v1/payment",paymentRoute);

// Testing the server
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your engle server is up and running ...",
  });
});

// Setting up port number
const PORT = 4000;

// Listening to the server
app.listen(PORT, () => {
  console.log(`Engle Backend is listening at ${PORT}`);
});

exports.app = functions.https.onRequest(app);
