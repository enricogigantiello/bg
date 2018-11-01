import React, { Component } from 'react';
import classnames from 'classnames';
import {Row, Col, Button, Image} from 'react-bootstrap';



// SongsCarouselElement component
export default class SongsCarouselElement extends Component {

  render() {
    const {
      song
    } = this.props;

    return (
      <div key={song._id} style= {{backgroundImage: `url(${song.imageUrl})`}} className="carousel-tile">
        {song.fullTitle}
      </div>
    );
  }
}
