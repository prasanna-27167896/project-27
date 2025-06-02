const express = require("express");
const verifyToken = require("../middlewares/verifyToken.js");

const router = express.Router();

router.get("/success", verifyToken, (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: `Welcome ${req.user.username}, protected route accessed`,
    });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ message: "Failed to access" });
  }
});

module.exports = router;
