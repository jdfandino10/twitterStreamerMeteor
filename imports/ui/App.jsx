import React, {Component} from "react";
import {PropTypes} from "prop-types";
import { Meteor } from "meteor/meteor";
import { createContainer} from "meteor/react-meteor-data"

import ColombiaMap from "./ColombiaMap.jsx";
import Overlay from "./Overlay.jsx";
import TweetsResults from "./TweetsResults.jsx";
import {Tweets} from "../api/Tweets.js";

export class App extends Component {
  constructor(props) {
    super(props);
    this.projection = null;
  }

  changeQuery(evt) {
    if (evt.key !== "Enter") {
      return;
    }
    // "this" will change in the method call, so I need to save it
    let component = this;

    console.log(evt.target.value);
    Meteor.call("twitter.stream", evt.target.value);
    this.resetCanvas();

  }

  setProjection(p) {
    this.projection = p;
  }

  getProjection() {
    return this.projection;
  }

  getTweetCoords() {
    let points = [];
    this.props.tweets.forEach((t) => {
      points.push(t.coordinates.coordinates);
    });
  }

  setResetCanvas(c) {
    this.resetCanvas = c;
  }

  render() {
    console.log("render!");
    return (
      <div>
        <input type="text" onKeyPress={this.changeQuery.bind(this)} placeholder="Query"/>
        { this.props && this.props.err ?
          <div>Error: {this.props.err}</div> :
          <span></span>
        }
        <h2>Results:</h2>
        {/*this.props && this.props.tweets ?
          <TweetsResults tweets={this.props.tweets}/>:
          <p>Enter a query</p>
        */}
        <ColombiaMap width="500" heigth="500" setProjection={this.setProjection.bind(this)} />
        <Overlay setResetCanvas={this.setResetCanvas.bind(this)} width="500" heigth="500" tweets={this.props.tweets} getProjection={ this.getProjection.bind(this) } />
      </div>
    );
  }
}

App.propTypes = {
  tweets : PropTypes.array.isRequired
};

export default AppContainer = createContainer(() => {
  Meteor.subscribe("tweets");


  return {
    tweets: Tweets.find({}).fetch()
  };
}, App);