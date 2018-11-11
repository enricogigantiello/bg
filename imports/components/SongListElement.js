import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
import {Row, Col, Button, Image, Glyphicon} from 'react-bootstrap';
import { Songs } from '../api/models/songs.js';

// Song component - represents a single song item
export default class SongListElement extends Component {

  togglePlayed() {
    Meteor.call('songs.togglePlayed', this.props.song._id, this.props.song.played);
  }

  render() {
    const songClassName = classnames({
      song: true,
      playedsong: this.props.song.played,
    });
    return (
      <li className={songClassName} onClick={this.togglePlayed.bind(this)} >
        <Row>
          <Col xs={8}>
            <div>
              <Glyphicon glyph="user" />
              <span className="song-artist">
                <strong>{this.props.song.artist}</strong>
              </span>
            </div>
            <div>
              <Glyphicon glyph="music" />
              <span className="song-title">
                {this.props.song.title}
              </span>
            </div>
          </Col>
          <Col xs={2}>
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
        //   this.props.showPlayedButton ? (
        //   <button className="toggle-private" onClick={this.togglePlayed.bind(this)}>
        //     { this.props.song.private ? 'Played' : 'Public' }
        //   </button>
        // ) : ''
        }

      </li>
    );
  }
}
