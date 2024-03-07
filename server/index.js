const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");

//Different Routes
const authRoute = require("./routes/authRoute");
const wordRoute = require("./routes/wordRoute");
const storyRoute = require("./routes/storyRoute");
const unseenRoute = require("./routes/unseenRoute");
const favouriteRoute = require("./routes/favouriteRoute");
const notesRoute = require('./routes/notesRoute')

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

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/word", wordRoute);
app.use("/api/v1/story", storyRoute);
app.use("/api/v1/unseen", unseenRoute);
app.use("/api/v1/favourite", favouriteRoute);
app.use('/api/v1/notes',notesRoute)

// Testing the server
app.get("/", (req, res) => {
  return res.json({
    success: true,
    message: "Your engle server is up and running ...",
  });
});

// Setting up port number
const PORT = process.env.PORT || 4000;

// Listening to the server
app.listen(PORT, () => {
  console.log(`Engle Backend is listening at ${PORT}`);
});
