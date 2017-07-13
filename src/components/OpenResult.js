import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import DisplayVideo from './DisplayVideo';

//Component displays a modal

class OpenResult extends React.Component {
  static propTypes = {
    result: PropTypes.object,
    onHide: PropTypes.func,
  };

  render() {
    const { songName, artist } = this.props.result;
    return (
      <Modal bsSize="large" className="modal-lg" show={this.props.show} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          <Modal.Title className="videoDetails">{artist} || {songName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <DisplayVideo result={this.props.result} />
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={this.props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default OpenResult;
