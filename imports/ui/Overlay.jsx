import React, { Component } from "react";


export default class Overlay extends Component {

	componentDidUpdate(prevProps, prevState) {
		if (this.props.tweets) {
			let canvas = this.canvas;
			let context = canvas.getContext('2d');
			let points = this.getTweetCoords();
			points.forEach((c) => {
				let projection = this.props.getProjection();
				let newPoint = projection(c);
				this.point(newPoint[0], newPoint[1], context);
			});
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

	point(x, y, context) {
		context.fillStyle = "#ff2626"; // Red color
  		context.beginPath();
  		context.arc(x, y, 2, 0, 2 * Math.PI, true);
  		context.fill();
	}

	render() {
		return (<div className="canvas">
		<canvas ref={ (canvas) => { this.canvas = canvas; } } width="500" height="500"></canvas>
		</div>);
	}

}