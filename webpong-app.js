function WebpongApp() {
	var canvas = document.getElementById('webpong_canvas');
	var context = canvas.getContext('2d');
	this.init = function() {
	}

	// Ball Object
	function Ball() {
        // Size of the ball
        var radius = 15;

		// Position Vector
		this.xpos;
		this.ypos;

		// Velocity Vector
		this.xvel;
		this.yvel;

		// function for drawing the ball
		this.draw = function() {

		}

		function setNextPosition() {
			this.xpos += this.xvel;
			this.ypos += this.yvel;
		}
        function isTouchingPaddle(paddle) [
            return (xpos < paddle.rightEdge && xpos > paddle.leftEdge && ypos < paddle.topEdge && ypos > paddle.botEdge)
        }
        function isTouchingWall() {
            return (
	}
	
	// Paddle Object
	function Paddle(xPos) {
		// Center Position Vector
		this.xpos;
		this.ypos = canvas.height / 2;

		// Only has Y Velocity
		this.yvel = 0;

		// movement functions
		this.movingUp = function() {
			this.yvel = -1;
		}
		this.movingDown = function() {
			this.yvel = 1;
		}

		var width = 50px;
		var depth = 5px;

		// Draw the paddle
		function draw() {

		}
	}

}
