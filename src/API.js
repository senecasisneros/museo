import axios from 'axios';
import ServerActions from './actions/ServerActions';

const API = {
  getAllVideos() {
    axios.get('/api/videos')
    .then(res => res.data)
    .then(ServerActions.receiveVideos)
    .catch(console.error);
  },
  getOneVideo(id) {
    axios.get('/api/videos/:id')
    .then(res => res.data)
    .then(ServerActions.getOneVideo)
    .catch(console.error);
  },
  createVideo(video) {
    axios.post('/api/videos', video)
    .then(res => res.data)
    .then(ServerActions.receiveOneVideo)
    .catch(console.error);
  },
  deleteVideo(id) {
    axios.delete('/api/videos/:id')
    .then(res => res.data)
    .then(ServerActions.deleteVideo)
    .catch(console.error);
  },
  getOneInfo(obj) {
    axios.post('/api/info', obj)
    .then(res => res.data)
    .then(ServerActions.getOneInfo)
    .catch(console.error);
  },
  getInfo(obj) {
    axios.post('/api/info/links', obj)
    .then(res => {
      console.log('res.data:', res.data);
      return res.data;
    })
    .then(ServerActions.getInfo)
    .catch(console.error);
  },
};

export default API;
