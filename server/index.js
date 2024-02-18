// Importing necessary modules and packages
const express = require("express");
const app = express();

// Setting up port number
const PORT = process.env.PORT || 4000;


// Testing the server
app.get("/", (req, res) => {
	return res.json({
		success: true,
		message: "Your server is up and running ...",
	});
});

// Listening to the server
app.listen(PORT, () => {
	console.log(`backend is listening at ${PORT}`);
});

// End of code.
