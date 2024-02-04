//import uploadThumbnail from "../public/images/Upload-video-preview.jpg";
const express = require("express");
const router = express.Router();
const fs = require("fs");
const crypto = require("crypto");
// const path = require("path");

const FILE_PATH = "./data/videos.json";

const readVideos = () => {
  const videosData = fs.readFileSync(FILE_PATH);
  const parsedVideos = JSON.parse(videosData);
  return parsedVideos;
};

//GET all videos
router.get("/", (req, res) => {
  const videos = readVideos();
  res.status(200).json(videos);
});

//GET single video
router.get("/:videoId", (req, res) => {
  const videos = readVideos();
  const singleVideo = videos.find((video) => video.id === req.params.videoId);
  res.json(singleVideo);
});

//POST video
router.post("/", (req, res) => {
  const newVideo = {
    id: crypto.randomUUID(),
    title: req.body.title,
    channel: "BrainStation",
    image: "http://localhost:8080/images/Upload-video-preview.jpg",
    description: req.body.description,
    views: "0",
    likes: "0",
    duration: "3.29",
    video: "https://project-2-api.herokuapp.com/stream", //
    timestamp: new Date(),
    comments: [],
  };

  const videos = readVideos();
  videos.push(newVideo);
  fs.writeFileSync(FILE_PATH, JSON.stringify(videos));

  res.status(201).json(newVideo);
});

module.exports = router;
