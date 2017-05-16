import React, {Component} from "react";
import { Meteor } from "meteor/meteor";



export default class Tweet extends Component {
  render() {
    return (<div className="tweet">
    	<div className="text-center">
    		<img src={this.props.tweet.user.profile_image_url} alt={this.props.tweet.user.screen_name + "profile image"}/> <br />
    	</div>
    	<h4>{this.props.tweet.user.screen_name} </h4>
      	<span>{this.props.tweet.text} </span>
      {/*<span>{JSON.stringify(this.props.tweet)}</span>*/}
    </div>);
  }
}