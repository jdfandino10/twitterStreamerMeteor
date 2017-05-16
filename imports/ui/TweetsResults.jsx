import React, {Component} from "react";


import Tweet from "./Tweet.jsx";

export default class TweetResults extends Component {
  renderTweets() {
    if(this.props.tweets.length > 0){
      let newArray = this.getRandomTweet();
      return newArray.map((tweet) => {
        return (<Tweet key={tweet.id} tweet={tweet}/>);
      });
    } else {
      return <div></div>;
    }
  }

  getRandomTweet() {
    let list = [];
    let used = [];
    let rnd = Math.floor((Math.random() * (this.props.tweets.length - 1)));
    list.push(this.props.tweets[rnd]);  
    return list;
  }

  render() {
    return (
      <div className="tweetResults">
        {this.renderTweets()}
      </div>
    );
  }
}