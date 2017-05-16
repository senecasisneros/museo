import React from 'react';
import axios from 'axios'
import $ from 'jquery';
import VideoStore from '../stores/VideoStore';
import VideoActions from '../actions/VideoActions';
import {ProgressBar} from 'react-bootstrap';

class DisplayVideo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      vidoes: VideoStore.getMusicAndLyrics()
    }

    this._onChange = this._onChange.bind(this);
  }
  componentDidMount() {
    VideoActions.getOneInfo(this.props.result);
    VideoStore.startListening(this._onChange);
  }

  componentWillUnMount() {
    VideoStore.stopListening(this._onChange);
  }

  _onChange() {
    this.setState({
      videos: VideoStore.getMusicAndLyrics()
    });
  }

  render() {
    if (this.state.videos) {
      let iframe = this.state.videos.urlVideo;
      let src = $(iframe).attr('src');

      let textLyrics1 = this.state.videos.lyrics.map((val, index) => {
        if (this.state.videos.lyrics.length / 2 < index && val) {
          if (val === 'br')
          return <br key={index} />
          else
          return val
        }
      });
      let textLyrics2 = this.state.videos.lyrics.map((val, index) => {
        if (this.state.videos.lyrics.length / 2 >= index && val) {
          if (val === 'br')
          return <br key={index} />
          else
          return val
        }
      });
      return (
        <div className="mainDisplay container">
          <div className="row">
            <div className="col-xs-6 col-sm-6 col-md-6 col-lg-6 iframe">
              <iframe width="500" height="500" src={src + '?autoplay=1'} frameBorder={0} allowFullScreen="allowFullScreen"></iframe>
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 lyricText2">
              {textLyrics2}
            </div>
            <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3 lyricText1">
              {textLyrics1}
            </div>
          </div>
        </div>
      )
    }
    else
    return <ProgressBar active now={45} />
  }
}

export default DisplayVideo;
