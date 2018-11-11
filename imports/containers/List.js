import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import {Row, Col, Button, Grid, Image} from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';

// models
import { Songs } from '../api/models/songs.js';

// components
import SongListElement from '../components/SongListElement.js';
import FilterBar from '../components/FilterBar.js';
import AccountsUIWrapper from '../components/AccountsUIWrapper.js';

// List component -
class List extends Component {

  constructor(props) {
    super(props);

    this.state = {
      splitPlayed: true,
      filterInitialLetter: false,
    };
  }

  filterByLetter(letter) {
    this.setState({
      filterInitialLetter: letter
    })
  }


  toggleHideCompleted() {
    this.setState({
      splitPlayed: !this.state.splitPlayed,
    });
  }

  renderSongs() {
    let songs = this.props.songs;
    let filteredSongs = this.props.songs;
    let unplayedSongs = [];
    let playedSongs = [];
    songs.forEach(song => {
      song.played ? playedSongs.push(song) : unplayedSongs.push(song)
    })

    // if (this.state.splitPlayed) {
    //   filteredSongs = filteredSongs.filter(song => !song.checked);
    // }
    // if (this.state.filterInitialLetter && this.state.filterInitialLetter !== '*') {
    //   filteredSongs = filteredSongs.filter(song => {
    //     return this.state.filterInitialLetter === song.fullTitleStartsWith;
    //   })
    // }
    return filteredSongs.map((song) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = song.owner === currentUserId;

      return (
        <SongListElement
          key={song._id}
          song={song}
          showPrivateButton={showPrivateButton}
        />
      );
    });
  }

  renderLists() {
    let songs = this.props.songs;
    let unplayedSongs = [];
    let playedSongs = [];
    songs.forEach(song => {
      song.played ? playedSongs.push(song) : unplayedSongs.push(song)
    })
    return (
      <Row>
        <Col xs={6} md={9}>
          <ul>
            {
              unplayedSongs.map((song) =>
                <SongListElement
                  key={song._id}
                  song={song}
                />
              )
            }
          </ul>
        </Col>
        <Col xs={6} md={3}>
          <ul>
            {
              playedSongs.map((song) =>
                <SongListElement
                  key={song._id}
                  song={song}
                />
              )
            }
          </ul>
        </Col>
      </Row>
    );
  }

  render() {
    return (
      <Grid>
        <Row>
          <header>
            <h1>Song List ({this.props.incompleteCount})</h1>
            {
              // <label className="hide-completed">
              //   <input
              //     type="checkbox"
              //     readOnly
              //     checked={this.state.splitPlayed}
              //     onClick={this.toggleHideCompleted.bind(this)}
              //   />
              // Hide Selected Songs
              // </label>
            }
            {
              // <FilterBar filterByLetter={this.filterByLetter.bind(this) } filteredLetter={this.state.filterInitialLetter} />
            }
          </header>
        </Row>
        {this.renderLists()}
      </Grid>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('songs');
  return {
    songs: Songs.find({ requestCount: { $gt: 0 } }, { sort: { requestCount: -1 } }).fetch(),
    incompleteCount: Songs.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(List);
