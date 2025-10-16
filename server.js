require("dotenv").config();
const express = require("express");
const connectDB = require("./db");
const authRoutes = require("./routes/authroutes");
const postRoutes = require("./routes/postroutes");

const app = express();
app.use(express.json());
connectDB();

app.get("/", (req, res) => res.send("Backend running"));
app.use("/auth", authRoutes);
app.use("/posts", postRoutes);

app.listen(process.env.PORT, () => console.log("Server running"));
