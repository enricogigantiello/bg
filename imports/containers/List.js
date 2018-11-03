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
      hideCompleted: false,
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
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderSongs() {
    let filteredSongs = this.props.songs;
    if (this.state.hideCompleted) {
      filteredSongs = filteredSongs.filter(song => !song.checked);
    }
    if (this.state.filterInitialLetter && this.state.filterInitialLetter !== '*') {
      filteredSongs = filteredSongs.filter(song => {
        return this.state.filterInitialLetter === song.fullTitleStartsWith;
      })
    }
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

  render() {
    return (
      <Grid>


          <div>
            <header>
              <h1>Song List ({this.props.incompleteCount})</h1>

              {
                // <label className="hide-completed">
                //   <input
                //     type="checkbox"
                //     readOnly
                //     checked={this.state.hideCompleted}
                //     onClick={this.toggleHideCompleted.bind(this)}
                //   />
                // Hide Selected Songs
                // </label>

              }



              {
                // <FilterBar filterByLetter={this.filterByLetter.bind(this) } filteredLetter={this.state.filterInitialLetter} />
              }
            </header>

            <ul>
              {this.renderSongs()}
            </ul>
          </div>


      </Grid>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('songs');
  return {
    songs: Songs.find({}, { sort: { requestCount: -1 } }).fetch(),
    incompleteCount: Songs.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(List);
