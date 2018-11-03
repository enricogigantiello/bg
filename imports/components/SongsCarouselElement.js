import React, { Component } from 'react';
import classnames from 'classnames';
import {Row, Col, Button, Image, Glyphicon} from 'react-bootstrap';



// SongsCarouselElement component
export default class SongsCarouselElement extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
    };
  }

  requestSong() {
    // Set the checked property to the opposite of its current value
    Meteor.call('songs.request', this.props.song._id, this.props.song.requestCount);
    this.setState({clicked: true});
    var self = this;
    setTimeout(function(){ self.setState({clicked: false}) }, 1000);

  }

  render() {
    const {
      song
    } = this.props;

    console.log(song.imageUrl);

    return (
      <div key={song._id} style= {{backgroundImage: `url('${song.imageUrl}')`}} className="carousel-tile" onClick={this.requestSong.bind(this)}>
        <div className="carousel-tile-top-left wordWrap">{song.artist}</div>
        <div className="carousel-tile-center wordWrap">{song.title}</div>
        <div className="carousel-tile-bottom-right" ><Glyphicon glyph="heart" className={this.state.clicked ? 'animate-heart' : 'heart'}/>{!this.state.clicked && song.requestCount}</div>
      </div>
    );
  }
}
