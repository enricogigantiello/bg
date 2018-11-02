import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import {Row, Col, Button, Grid, Image} from 'react-bootstrap';
import { withTracker } from 'meteor/react-meteor-data';

// models
import { Songs } from '../api/models/songs.js';

// components
import Song from '../components/Song.js';
import SongsCarousel from '../components/SongsCarousel.js';
import FilterBar from '../components/FilterBar.js';
import AccountsUIWrapper from '../components/AccountsUIWrapper.js';

// List component -
class List extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
      filterInitialLetter: false,
      showTiles: true
    };
  }

  handleToggleView(event) {
    event.preventDefault();
    this.setState({ showTiles: !this.state.showTiles})

  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const title = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Meteor.call('songs.insert', title);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  filterByLetter(letter) {
    this.setState({
      filterInitialLetter: letter
    })
  }



  getSongs() {
    Meteor.call('songs.insert', title);
    return [
      { _id: 1, title: 'This is song 1' },
      { _id: 2, title: 'This is song 2' },
      { _id: 3, title: 'This is song 3' },
    ];
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
        <Song
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
        <Row >
          <div className="center">
            <img src={'/bg-black.jpg'} alt="Smiley face" height="140" width="140" />
          </div>
        </Row>
        {// <button onClick={this.handleToggleView.bind(this)}>VIEW</button>
        }
        { !this.state.showTiles &&
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



              <FilterBar filterByLetter={this.filterByLetter.bind(this) } filteredLetter={this.state.filterInitialLetter} />

              { false &&
                <form className="new-song" onSubmit={this.handleSubmit.bind(this)} >
                  <input
                    type="text"
                    ref="textInput"
                    placeholder="Type to add new song"
                  />
                </form>
              }
            </header>

            <ul>
              {this.renderSongs()}
            </ul>
          </div>
        }

        { this.state.showTiles &&

          <SongsCarousel songs={this.props.songs} />

        }

      </Grid>
    );
  }
}

export default withTracker(() => {
  Meteor.subscribe('songs');
  return {
    songs: Songs.find({}, { sort: { fullTitle: 1 } }).fetch(),
    incompleteCount: Songs.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(List);
