import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';

// models
import { Songs } from '../api/models/songs.js';

// components
import Song from '../components/Song.js';
import AccountsUIWrapper from '../components/AccountsUIWrapper.js';

// App component - represents the whole app
class Home extends Component {

  constructor(props) {
    super(props);
  }

  loadSongList() {
    Meteor.call('songs.read');
    Meteor.call('songs.createMock');
  }

  render() {
    return (
      <div className="">
        <button onClick={this.loadSongList.bind(this)}>
        Load
        </button>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
  };
})(Home);
