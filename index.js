const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const path = require("path");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 3000;

connectDB();

app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));

app.use(express.static( "public"));
app.use("/public", express.static  ("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use("/", require("./routes/index"));

app.listen(PORT, () => {
    console.log(`Server Running on : http://localhost:${PORT}`);
});
