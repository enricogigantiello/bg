import React, { Component } from 'react';
import classnames from 'classnames';
import {Row, Col, Button, Image} from 'react-bootstrap';



// SongsCarouselElement component
export default class SongsCarouselElement extends Component {

  requestSong() {
    // Set the checked property to the opposite of its current value
    Meteor.call('songs.request', this.props.song._id, this.props.song.requestCount);
  }

  render() {
    const {
      song
    } = this.props;

    console.log(song.imageUrl);

    return (
      <div key={song._id} style= {{backgroundImage: `url('${song.imageUrl}')`}} className="carousel-tile" onClick={this.requestSong.bind(this)}>
        <div className="carousel-tile-top-left">{song.artist}</div>
        <div className="carousel-tile-center">{song.title}</div>
        <div className="carousel-tile-bottom-right">{song.requestCount}</div>
      </div>
    );
  }
}
