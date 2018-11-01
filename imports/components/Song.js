import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import {Row, Col, Button, Image} from 'react-bootstrap';
import { Songs } from '../api/models/songs.js';

// Song component - represents a single song item
export default class Song extends Component {
  requestSong() {
    // Set the checked property to the opposite of its current value
    Meteor.call('songs.request', this.props.song._id, this.props.song.requestCount);
  }

  deleteSong() {
    Meteor.call('songs.remove', this.props.song._id);
  }

  togglePrivate() {
    Meteor.call('songs.setPrivate', this.props.song._id, ! this.props.song.private);
  }

  render() {
    const songClassName = classnames({
      song: true,
    });
    return (
      <li className={songClassName} >
        <Row onClick={this.requestSong.bind(this)}>
          <Col xs={4}>
            <Image src={this.props.song.imageUrl} rounded responsive />
          </Col>
          <Col xs={4}>
            <span className="title">
              <strong>{this.props.song.artist}</strong> : {this.props.song.title}
              <br/>
              {this.props.song.fullTitle}
            </span>
          </Col>
          <Col xs={4}>
          {this.props.song.requestCount}
          </Col>
        </Row>
        {
        // <button className="delete" onClick={this.deleteSong.bind(this)}>
        //   &times;
        // </button>

        // <input
        //   type="checkbox"
        //   readOnly
        //   checked={!!this.props.song.checked}
        //   onClick={this.requestSong.bind(this)}
        // />
        }
        {
        //   this.props.showPrivateButton ? (
        //   <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
        //     { this.props.song.private ? 'Private' : 'Public' }
        //   </button>
        // ) : ''
        }

      </li>
    );
  }
}
