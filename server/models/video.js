

const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  url: { type: String },
  lyrics_url: { type: String },
});

const Video = mongoose.model('Video', videoSchema);

module.exports = Video;
