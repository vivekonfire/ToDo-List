const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const app = express();

connectDB();

app.use(express.json({ extended: false, limit: "50mb" }));

app.use("/api/signup", require("./routes/signup"));
app.use("/api/signin", require("./routes/signin"));
app.use("/api/todo", require("./routes/todo"));
app.use("/api/forgotpassword", require("./routes/forgotpass"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
