import API from '../API';

const VideoActions = {
  getAllVideos: API.getAllVideos,

  getOneVideo(id) {
    API.getOneVideo(id);
  },
  createVideo(video) {
    API.createVideo(video);
  },
  deleteVideo(id) {
    API.deleteVideo(id);
  },
  getOneInfo(obj) {
    API.getOneInfo(obj);
  },
  getInfo(obj) {
    API.getInfo(obj);
  }
}

export default VideoActions
