import React from 'react';
// import axios from 'axios';
import { ProgressBar } from 'react-bootstrap';
import $ from 'jquery';
import PropTypes from 'prop-types';
import VideoStore from '../stores/VideoStore';
import VideoActions from '../actions/VideoActions';

class DisplayVideo extends React.Component {
    static propTypes = {
      result: PropTypes.object,
    };

  constructor(props) {
    super(props);

    this.state = {
      vidoes: VideoStore.getMusicAndLyrics(),
    };
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
      videos: VideoStore.getMusicAndLyrics(),
    });
  }

  render() {
    if (this.state.videos) {
      const iframe = this.state.videos.urlVideo;
      const src = $(iframe).attr('src');

      const textLyrics = this.state.videos.lyrics.map((val, index) => {
        if (val) {
          return (<p key={index} className="lyrics">{val}</p>);
        }
      });
      // const textLyrics1 = this.state.videos.lyrics.map((val, index) => {
      //   if (val) {
      //     return (<p key={index} className="lyrics">{val}</p>);
      //   }
      // });
      return (
        <div className="mainDisplay container">
          <div className="row">
            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-6 iframe">
              <iframe width="560" height="560" src={`${src}?autoplay=1`} frameBorder={0} allowFullScreen="allowFullScreen" />
            </div>
            <div className="col-xs-12 col-sm-12 col-md-4 col-lg-6 lyricText2">
              {textLyrics}
              {/* {textLyrics} {textLyrics1} */}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h3 id='progress'>Retrieving Video and Lyrics. </h3>
          <ProgressBar active now={45} />
        <div className="alert">
          <span className="closebtn test" ></span>
      <p className="animated fadeIn">Video and Lyrics are unavailable. Please choose a different song.</p>
      </div>

        </div>
      );
    }
  }
}
export default DisplayVideo;
