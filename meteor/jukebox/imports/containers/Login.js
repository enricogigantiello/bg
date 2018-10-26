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

        <Row className="login">
          <Col xs={6} xsOffset={3}>
            <h2>Tras</h2>
            <Row>
              <Col xs={4}>
                <Button onClick={this.loadView.bind(this, 'app')}>Uncino</Button>
              </Col>
              <Col xs={4}>
                <Button onClick={this.loadView.bind(this, 'app')}>Massone</Button>
              </Col>
              <Col xs={4}>
                <Button onClick={this.loadView.bind(this, 'list')}>Sala</Button>
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
