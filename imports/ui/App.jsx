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
    this.state = {
      "howMany": 5
    }
  }

  componentDidMount() {
    Meteor.call("twitter.firstDelete");
  }

  changeQuery(evt) {
    if (evt.key !== "Enter") {
      return;
    }
    // "this" will change in the method call, so I need to save it
    let component = this;

    console.log(evt.target.value);
    Meteor.call("twitter.stream", evt.target.value);
    this.resetCanvas1();
    this.resetCanvas2();

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

  setResetCanvas1(c) {
    this.resetCanvas1 = c;
  }

  setResetCanvas2(c) {
    this.resetCanvas2 = c;
  }

  getSelectedTweet() {
    return this.selectedTweet;
  }

  setSelectedTweet(e) {
    this.selectedTweet = e;
  }

  newTweet() {
    this.tweet_results.forceUpdate();
    this.selected_overlay.forceUpdate();
  }

  render() {
    console.log("render!");
    return (
      <div className="container">
        <div className="row">
          <h1>Colombia Twitter Visualizer</h1>
        </div>
        <div className="row">
          <p> Search something and watch where that is tweeted!</p>
        </div>
        <div className="row">
          <label>Search something: </label>
          <input type="text" onKeyPress={this.changeQuery.bind(this)} placeholder="Query"/>
          { this.props && this.props.err ?
            <div>Error: {this.props.err}</div> :
            <span></span>
          }
        </div>
        <div className="row">
          <h2>Map:</h2>
        </div>
        <div className="row">
          <div className="map col-xs-9">
            <ColombiaMap width="500" heigth="500" setProjection={this.setProjection.bind(this)} />
            <Overlay setResetCanvas={this.setResetCanvas1.bind(this)} width="500" heigth="500" tweets={this.props.tweets} getProjection={ this.getProjection.bind(this) } />
            <Overlay ref={ (r)=> {this.selected_overlay = r;} } setResetCanvas={this.setResetCanvas2.bind(this)} width="500" heigth="500" getProjection={ this.getProjection.bind(this) } getSelectedTweet={this.getSelectedTweet.bind(this)} />
          </div>
          <div className="tweets col-xs-3">
            <h2>Random Tweets:</h2>
            <button onClick={this.newTweet.bind(this)}>New</button>
            {this.props && this.props.tweets && this.props.tweets.length > 0 ?
              <TweetsResults ref={ (r)=> {this.tweet_results = r;} } tweets={this.props.tweets} setSelectedTweet={this.setSelectedTweet.bind(this)} />:
              <p></p>
            }
          </div>
        </div>
        
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