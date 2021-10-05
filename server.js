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

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  );
}

app.listen(PORT, () => console.log(`Server running at ${PORT}`));
