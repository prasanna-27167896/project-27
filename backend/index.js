const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const db = require("./utils/db.js");
const userRouter = require("./routes/userRoutes.js");
const router = require("./routes/protectedRoute.js");

dotenv.config({ path: "./.env" });

const app = express();

app.use(
  cors({
    origin: "https://bio-insta-ai.netlify.app",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/protect", router);

db();

app.get("/", (req, res) => {
  res.send("API is working");
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
