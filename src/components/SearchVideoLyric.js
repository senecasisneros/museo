import React from 'react';
import { FormGroup, FormControl, Button } from 'react-bootstrap';
import VideoActions from '../actions/VideoActions';

class SearchVideoLyric extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      songName: '',
      artist: '',
    };
    this.getValidationState = this.getValidationState.bind(this);
    this.changeSong = this.changeSong.bind(this);
    this.changeArtist = this.changeArtist.bind(this);
    this.submit = this.submit.bind(this);
  }

  getValidationState() {
    const { song_name, artist } = this.state;
    if (song_name && artist) {
      return 'success';
    }
    return 'error';
  }

  changeSong(e) {
    this.setState({ songName: e.target.value });
  }

  changeArtist(e) {
    this.setState({ artist: e.target.value });
  }

  submit(e) {
    e.preventDefault();
    const { songName, artist } = this.state;
    if (songName || artist) {
      // trigger action
      VideoActions.getInfo({ songName, artist });
      this.setState({
        songName: '',
        artist: '',
      });
    }
  }

  render() {
    return (
      <div className="mainPage" >
        <h1 id="mainTitle">Museo</h1>
        <form onSubmit={this.submit} className="form">
          <FormGroup
            controlId="formBasicText"
            validationState={this.getValidationState()}
          />
          <FormControl
            type="text"
            value={this.state.artist}
            placeholder="Artist Name"
            onChange={this.changeArtist}
          />
          <FormControl
            type="text"
            value={this.state.songName}
            placeholder="Song Name"
            onChange={this.changeSong}
          />
          <Button type="submit" className="btn btn-outline-primary submitButton center-block" bsSize="large">
            <span className="glyphicon glyphicon-search"> Search</span>
          </Button>
        </form>
      </div>
    );
  }
}

export default SearchVideoLyric;
