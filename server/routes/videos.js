

const express = require('express');
const router = express.Router();

const Video = require('../models/video');

router.route('/')
.get((req, res) => {
  Video.find({}, (err, videos) => {
    res.status(err ? 400 : 200).send(err || videos);
  });
})
.post((req, res) => {
  Video.create(req.body, (err, videos) => {
    res.status(err ? 400 : 200).send(err || videos);
  });
});

router.route('/:id')
.get((req, res) => {
  Video.findById(req.params.id, (err, video) => {
    res.status(err ? 400 : 200).send(err || video);
  });
})
.delete((req, res) => {
  Video.findByIdAndRemove(req.params.id, (err, videos) => {
    res.status(err ? 400 : 200).send(err || videos);
  });
})
.put((req, res) => {
  Video.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true }, (err, videos) => {
    if (err) {
      return res.status(400).send(err);
    }
    Video.find({}, (err, videos) => {
      res.status(err ? 400 : 200).send(err || videos);
    });
  });
});


module.exports = router;
