import React from 'react';
import { Table } from 'react-bootstrap';
import VideoActions from '../actions/VideoActions';
import VideoStore from '../stores/VideoStore';
import OpenResult from './OpenResult';

//Component renders the search results in a table.

class DisplayResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      showModal: false,
      actualResult: {},
    };
    this._onChange = this._onChange.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount() {
    VideoActions.getInfo();
    VideoStore.startListening(this._onChange);
  }

  close() {
    this.setState({ showModal: false });
  }

  open(result) {
    this.setState({ showModal: true, actualResult: result });
  }
  componentWillUnMount() {
    VideoStore.stopListening(this._onChange);
  }
  _onChange() {
    this.setState({
      results: VideoStore.getLinks(),
    });
  }
  render() {
    //results: Object with artist, songName and urlVideo
    if (this.state.results.length !== 0) {
      console.log('results:', this.state.results);
      const trs = this.state.results.map((val, index) => (
        <tr onClick={this.open.bind(null, val)} key={index + 1}>
          <td>{val.artist}</td>
          <td>{val.songName}</td>
          <td>{val.url}</td>
        </tr>
        ));
      return (
        <div className="mainTable">
          <p id="directions">Click on the song to display the music video and lyrics</p>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="displayRow">Artist</th>
                <th className="displayRow">Song</th>
                <th className="displayRow">URL</th>
              </tr>
            </thead>
            <tbody className="displayRow">
              {trs}
            </tbody>
          </Table>

          <OpenResult result={this.state.actualResult}show={this.state.showModal} onHide={this.close} />
        </div>
      );
    }
    return <div />;
  }
}

export default DisplayResults;
