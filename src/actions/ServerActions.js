import AppDispatcher from '../AppDispatcher';

const ServerActions = {
  receiveVideo(videos) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_VIDEOS',
      videos
    })
  },
  receiveOneVideo(id) {
    AppDispatcher.dispatch({
      type: 'RECEIVE_ONE_VIDEO',
      id
    })
  },
  createVideo(video) {
    AppDispatcher.dispatch({
      type: "CREATE_VIDEO",
      video
    })
  },
  deleteVideo(id) {
    AppDispatcher.dispatch({
      type: 'DELETE_VIDEO',
      id
    })
  },
  getOneInfo(obj) {
    AppDispatcher.dispatch({
      type: "GET_ONE_INFO",
      obj
    })
  },
  getInfo(obj) {
    AppDispatcher.dispatch({
      type: "GET_INFO",
      obj
    })
  }
}

export default ServerActions;
