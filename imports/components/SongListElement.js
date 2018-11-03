import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import {Row, Col, Button, Image, Glyphicon} from 'react-bootstrap';
import { Songs } from '../api/models/songs.js';

// Song component - represents a single song item
export default class SongListElement extends Component {
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
        <Row>
          <Col xs={9}>
            <Glyphicon glyph="user" />
            <span className="song-artist">
              <strong>{this.props.song.artist}</strong>
            </span>
            <Glyphicon glyph="music" />
            <span className="song-title">
              {this.props.song.title}
            </span>
          </Col>
          <Col xs={3}>
            <span className="song-count">{this.props.song.requestCount}</span>
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
