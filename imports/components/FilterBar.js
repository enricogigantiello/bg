import React, { Component } from 'react';
import classnames from 'classnames';
import {Row, Col, Button, Image} from 'react-bootstrap';


const ALPHABET = ['*','A', 'B', 'C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','#']

// FilterBar component
export default class FilterBar extends Component {

  filter(letter) {
    const {
      filterByLetter
    } = this.props;
    filterByLetter(letter)
  }

  render() {
    const {
      filteredLetter
    } = this.props;


    return (
      <Row className="filterbar">
        { ALPHABET.map(letter => {
            const letterClassName = classnames({
              'filterbar-letter-button': true,
              'filterbar-letter-button-active': letter === filteredLetter
            });
            return <Col xs={1} md={1} key={letter}><a className={letterClassName}  onClick={this.filter.bind(this, letter)}>{letter}</a></Col>

          })
        }
      </Row>
    );
  }
}
