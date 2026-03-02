const express = require("express");
const router = express.Router();

const upload = require("../middlewares/uploadMiddleware");
const { protect } = require("../middlewares/authMiddleware");
const { authorizeRoles } = require("../middlewares/roleMiddleware");
const {
  uploadVideo,
  getVideos,
  streamVideo,
} = require("../controllers/videoController");

router.post(
  "/upload",
  protect,
  upload.single("video"),
  uploadVideo
);

router.get("/", protect, getVideos);

router.get("/stream/:id",streamVideo);

module.exports = router;