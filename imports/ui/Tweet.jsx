import React, {Component} from "react";
import { Meteor } from "meteor/meteor";



export default class Tweet extends Component {
  render() {
    return (<div className="tweet">
    	<div className="row">
    		<div className="col-xs-4 col-md-2 tweet-img">
				<img src={this.props.tweet.user.profile_image_url} alt={this.props.tweet.user.screen_name + "profile image"}/>
    		</div>
    		<div className="col-xs-8 col-md-10">
    			<h4>{this.props.tweet.user.screen_name} </h4>
      			<span>{this.props.tweet.text} </span>
    		</div>
    	</div>
      {/*<span>{JSON.stringify(this.props.tweet)}</span>*/}
    </div>);
  }
}