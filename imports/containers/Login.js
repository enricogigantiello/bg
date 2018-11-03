import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Redirect } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import {Row, Col, Button} from 'react-bootstrap';

// Login component - represents the whole app
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      route: ""
    };
  }

  loadView(route) {
    this.setState({redirect: true, route: route});
  }



  render() {
    if (this.state.redirect) {
      return <Redirect push to={`/${this.state.route}`} />;
    }
    return (
      <div>
        <Row >
          <div className="center">
            <img src={'/bg-black.jpg'} alt="Smiley face" height="140" width="140" />
          </div>
        </Row>
        <Row className="login">
          <Col xs={6} xsOffset={3}>
            <h2>Tras</h2>
            <Row>
              <Col xs={4}>
                <Button onClick={this.loadView.bind(this, 'list')}>Uncino</Button>
              </Col>
              <Col xs={4}>
                <Button onClick={this.loadView.bind(this, 'home')}>Massone</Button>
              </Col>
              <Col xs={4}>
                <Button onClick={this.loadView.bind(this, 'carousel')}>Sala</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    currentUser: Meteor.user(),
  };
})(Login);
