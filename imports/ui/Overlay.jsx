import React, { Component } from "react";


export default class Overlay extends Component {

	componentDidUpdate(prevProps, prevState) {

		let canvas = this.canvas;
		let context = canvas.getContext('2d');
		let projection = this.props.getProjection();
		if (this.props.tweets && !this.props.getSelectedTweet) {
			let points = this.getTweetCoords();
			points.forEach((c) => {
				let newPoint = projection(c);
				this.point(newPoint[0], newPoint[1], context, "#ff2626", 2);
			});
		} else if (this.props.getSelectedTweet) {
			this.resetCanvas();
			let point = this.props.getSelectedTweet().coordinates.coordinates;
			let newPoint = projection(point);
			this.point(newPoint[0], newPoint[1], context, "#2626ff", 3);
		}
	}

	componentDidMount() {
		this.props.setResetCanvas(this.resetCanvas.bind(this));
	}

	resetCanvas() {
		let canvas = this.canvas;
		let context = canvas.getContext('2d');
		context.clearRect(0, 0, canvas.width, canvas.height);
	}

	getTweetCoords() {
    	let points = [];
    	this.props.tweets.forEach((t) => {
      		points.push(t.coordinates.coordinates);
    	});
    	return points;
  	}

	point(x, y, context, color, r) {
		context.fillStyle = color; // Red color
  		context.beginPath();
  		context.arc(x, y, r, 0, 2 * Math.PI, true);
  		context.fill();
	}

	render() {
		return (<div className={"canvas " + (this.props.getSelectedTweet ? "selected":"")}>
		<canvas ref={ (canvas) => { this.canvas = canvas; } } width="500" height="500"></canvas>
		</div>);
	}

}