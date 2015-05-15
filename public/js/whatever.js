;(function () {
	"use strict";
	var wwidth = window.screen.width,
		wheight = window.screen.height,
		paper = Snap(wwidth, wheight),
		circle,
		path,
		d,
		style = ({
			fill: 'orange',
			stroke: 'white',
			strokeWidth: 5
		});


		path = paper
		.path("")
		.attr({
			stroke: 'orange',
			strokeWidth: 2,
			fill: "transparent"
		});
	var pathArray = [];

	function updatePath () {
		var first = pathArray[0];
		var pathString = "M" + first.x + " " +  first.y;
		pathArray.slice(1)
		.forEach(function (el) {
			pathString += "T" + el.x + " " + el.y;
		});
		path.attr({
			d: pathString
		});
		
	}

	paper.click(function (e) {
		
		if(e.target.tagName === "svg"){
			paper.circle(e.offsetX, e.offsetY, 15)
			.attr(style)
			.data('i', pathArray.length)
			.mouseover(function () {
				this.stop().animate({r: 25}, 1000, mina.elastic);
				this.animate(
					{fill: 'red',
					stroke: 'black'
							}, 200);
			}).
			mouseout(function () {
				this.stop().animate({r: 15}, 1000, mina.easeinout);
				this.animate(
					{fill: 'orange',				
					stroke: 'white'
					}, 10);
			})
			.drag(function (dx, dy, x, y) {
				this.attr({
					cx: x,
					cy: y
				});
				var currentNode = pathArray[this.data('i')];
				currentNode.x = x;
				currentNode.y = y;
				updatePath();
				
			},
			function () {
				path.stop().animate({
					opacity: 0.2
				}, 200, mina.elastic);
			},
			function () {
				path.stop().animate({
					opacity: 1
				}, 1000, mina.easeinout);
			});


			pathArray.push({
				x: e.offsetX,
				y: e.offsetY
			});
			updatePath();
		}
		
		
	
	/*	var pathString = path.attr('d');
		var coords = e.offsetX + " " + e.offsetY;
		path.attr({
			d: pathString ? pathString + ("L " + coords) : "M " + coords			
		});
		console.log(path);*/
	});


})();