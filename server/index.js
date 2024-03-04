const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const authRoute=require("./routes/authRoute");
const wordRoute=require("./routes/wordRoute");


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

app.use("/auth",authRoute);
app.use("/word",wordRoute);


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

