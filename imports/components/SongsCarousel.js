import React, { Component } from 'react';
import classnames from 'classnames';
import {Row, Col, Button, Image, Grid} from 'react-bootstrap';
import SongsCarouselElement from './SongsCarouselElement.js';



// SongsCarousel component
export default class SongsCarousel extends Component {

  render() {
    const {
      songs
    } = this.props;

    var songsByLetter = {};
    songs.map(song => {
      console.log(song);
      if (songsByLetter[song.fullTitleStartsWith]) songsByLetter[song.fullTitleStartsWith].push(song)
      else songsByLetter[song.fullTitleStartsWith] = [song];
    })

    console.log(songsByLetter);

    return (
      <Row>
        { Object.keys(songsByLetter).map((letter, idx) =>
          <div className="carousel" key={letter + idx}>
            <div className="carousel-row">
              <h2>{letter}</h2>
              {
                songsByLetter[letter].map((song, idx2) => <SongsCarouselElement key={song._id + idx2} song={song} />)
              }
            </div>
          </div>

        )}
      </Row>
    );
  }
}
