import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';

import { Songs } from '../api/models/songs.js';

// Song component - represents a single song item
export default class Song extends Component {

  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Meteor.call('songs.setChecked', this.props.song._id, !this.props.song.checked);
  }

  deleteSong() {
    Meteor.call('songs.remove', this.props.song._id);
  }

  togglePrivate() {
    Meteor.call('songs.setPrivate', this.props.song._id, ! this.props.song.private);
  }

  render() {
    const songClassName = classnames({
      checked: this.props.song.checked,
      private: this.props.song.private,
    });
    return (
      <li className={songClassName}>
        <button className="delete" onClick={this.deleteSong.bind(this)}>
          &times;
        </button>

        <input
          type="checkbox"
          readOnly
          checked={!!this.props.song.checked}
          onClick={this.toggleChecked.bind(this)}
        />
        { this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
            { this.props.song.private ? 'Private' : 'Public' }
          </button>
        ) : ''}
        <span className="title">
          <strong>{this.props.song.username}</strong> : {this.props.song.title}
        </span>
      </li>
    );
  }
}
