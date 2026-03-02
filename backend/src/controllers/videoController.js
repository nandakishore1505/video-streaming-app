const Video = require("../models/Video");
const fs = require("fs");
const path = require("path");

/*
========================================
UPLOAD VIDEO
========================================
*/
exports.uploadVideo = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No video file uploaded" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { title, description } = req.body;

    const video = await Video.create({
      title,
      description,
      filePath: req.file.path,
      fileSize: req.file.size,
      uploadedBy: req.user._id,
      organizationId: req.user.organizationId,
      status: "processing",
      processingProgress: 0,
      sensitivity: null,
    });

    res.status(201).json({
      message: "Video uploaded successfully",
      video,
    });
  } catch (error) {
    console.log("UPLOAD ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
/*
========================================
GET VIDEOS
========================================
*/
exports.getVideos = async (req, res) => {
  try {
    const videos = await Video.find();
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/*
========================================
STREAM VIDEO
========================================
*/
exports.streamVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    const videoPath = path.resolve(video.filePath);

    if (!fs.existsSync(videoPath)) {
      return res.status(404).json({ message: "File not found" });
    }

    const stat = fs.statSync(videoPath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (!range) {
      // 🔥 send full video if no range header
      res.writeHead(200, {
        "Content-Length": fileSize,
        "Content-Type": "video/mp4",
      });

      fs.createReadStream(videoPath).pipe(res);
      return;
    }

    const parts = range.replace(/bytes=/, "").split("-");
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

    const chunkSize = end - start + 1;

    const file = fs.createReadStream(videoPath, { start, end });

    res.writeHead(206, {
      "Content-Range": `bytes ${start}-${end}/${fileSize}`,
      "Accept-Ranges": "bytes",
      "Content-Length": chunkSize,
      "Content-Type": "video/mp4",
    });

    file.pipe(res);
  } catch (error) {
    console.log("STREAM ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};