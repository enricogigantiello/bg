import React, { Component } from 'react';
import classnames from 'classnames';
import {Row, Col, Button, Image} from 'react-bootstrap';
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
      <div>
        { Object.keys(songsByLetter).map((letter, idx) =>
          <div className="carousel" key={letter}>
            <div className="carousel-row">
              {
                songsByLetter[letter].map(song => <SongsCarouselElement song={song} />)
              }
            </div>
          </div>

        )}
      </div>
    );
  }
}
