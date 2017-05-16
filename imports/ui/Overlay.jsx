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
  		context.arc(x, y, 1, 0, 2 * Math.PI, true);
  		context.fill();
  		console.log("pinta punto: "+x+" "+y);
	}

	render() {
		return (<div>
		<canvas ref={ (canvas) => { this.canvas = canvas; } } width={this.props.width} height={this.props.height}></canvas>
		</div>);
	}

}