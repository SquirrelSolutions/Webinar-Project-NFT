const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
const { errorHandler } = require("./middleware/errorMiddleware");
const { Server } = require("http");
const cors = require("cors");

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

const __myPath = path.resolve();
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__myPath, "/frontend/build")));

	app.use("/api/wallet", require("./routes/walletRoutes"));
	app.use("/api/sendMail", require("./routes/mailRoutes"));
	
	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__myPath, "frontend", "build", "index.html"))
	);
} else {
	app.get("/", (req, res) => {
		res.send("API is running....");
	});
}

app.use("/api/wallet", require("./routes/walletRoutes"));
app.use("/api/sendMail", require("./routes/mailRoutes"));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
