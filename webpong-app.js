WebpongApp = (function() {
	var canvas = document.getElementById('webpong_canvas');
	var context = canvas.getContext('2d');
    var ball;
    var paddles = [];
    var PADDLE_OFFSET = 30;
    var FREQUENCY = 30;
    var speed = 1000 / FREQUENCY;

	function init() {
        paddle0 = new Paddle(PADDLE_OFFSET);
        paddle1 = new Paddle(canvas.width - PADDLE_OFFSET);
        paddle0.bindKeys(87, 83);
        paddle1.bindKeys(38, 40);
        paddles = [paddle0, paddle1];
        ball = new Ball();
        setInterval(run, speed);
	}

    function run() {
        context.clearRect(0,0,canvas.width,canvas.height);
        paddles[0].run();
        paddles[1].run();
        ball.run();
    }

	// Ball Object
	function Ball() {
        // Size of the ball
        var radius = 15;
        // Track the interval process
        var process;

		// Position Vector
        var xpos = parseInt(canvas.width) / 2;
        var ypos = parseInt(canvas.height) / 2;

		// Velocity Vector
		var xvel = 0;
		var yvel = 2;


		// function for drawing the ball
        function draw() {
            context.beginPath();
            context.strokeStyle = 'black';
            context.lineWidth = 5;
            context.arc(xpos, ypos, radius, 0, (Math.PI * 2), false);
            context.stroke();
            context.closePath();
		}

		function setNextPosition() {
			xpos = xpos + xvel;
			ypos = ypos + yvel;
		}

        function isTouchingPaddle(paddle) {
            var leftLimit = xpos - radius;
            var rightLimit = xpos + radius;
            
        }

        function isMovingTowardsPaddle(paddle) {
            (xpos - paddle.xpos > 0) && (xvel > 0);
        }

        function paddleCheck() {

        }

        function isTouchingWall() {
            var topLimit = ypos - radius,
                botLimit = ypos + radius,
                leftLimit = xpos - radius,
                rightLimit = xpos + radius;

            if (leftLimit < 0) return 'left';
            if (topLimit < 0) return 'top';
            if (rightLimit > canvas.width) return 'right';
            if (botLimit > canvas.height) return 'bot';
            return null;
        }
        function paddleBounce() {
            xvel *= -1;
        }
        function wallBounce() {
            yvel *= -1;
        }
        function wallCheck() {
            var wallStatus = isTouchingWall();
            if(wallStatus) {
                switch(wallStatus) {
                    case 'top':
                        if (yvel < 0) wallBounce();
                        break;
                    case 'bot':
                        if (yvel > 0) wallBounce();
                        break;
                    case 'left':
                        // give the left player a point and reset ball
                    case 'right':
                        // give the right player a point and reset ball
                }
            }
        }

        // Run the Ball function
        function run() {
            wallCheck();
            setNextPosition();
            draw();
        }

        // Initiate the Ball
        function init() {
            //set the velocity to a random w/e and run the Ball
        }

        // Reset the Ball
        function reset() {
        }

        return {
            xpos: xpos,
            ypos: ypos,
            run: run
        }
	}
	
	// Paddle Object
	function Paddle(xPos) {
		// Center Position Vector
		this.xpos = xPos;
		this.ypos = canvas.height / 2;
        var self = this;

		// Only has Y Velocity
		this.yvel = 0;
        this.movement;

		var width = 50;
		var depth = 5;

		// Draw the paddle
		this.draw = function() {
            context.strokeStyle = 'black';
            context.lineWidth = 5;
            context.lineCap = 'round';
            context.beginPath();
            context.moveTo(self.xpos, self.ypos + (width / 2));
            context.lineTo(self.xpos, self.ypos - (width / 2));
            context.stroke();
            context.closePath();
		}
		// movement functions
        this.bindMovementKeys = function(up, down, command) {
            document.addEventListener('keydown', function(key) {
                switch(key.keyCode) {
                    case up:
                        key.preventDefault();
                        self.movement = 'up';
                        break;
                    case down:
                        key.preventDefault();
                        self.movement = 'down';
                        break;
                    case command:
                }
            });
            document.addEventListener('keyup', function(key) {
                switch(key.keyCode) {
                    case up:
                        key.preventDefault();
                        self.movement = null;
                        break;
                    case down:
                        key.preventDefault();
                        self.movement = null;
                        break;
                    case command:
                }
            });
        }
        this.setMovement = function() {
            if (self.movement == 'up') {
                self.yvel = -1;
            } else if (self.movement == 'down') {
                self.yvel = 1;
            } else {
                self.yvel = 0;
            }
        }
        this.getNextPosition = function() {
            self.setMovement();
            self.ypos += self.yvel;
        }

        this.run = function() {
            self.getNextPosition();
            self.draw();
        }
        return {
            xpos: self.xpos,
            ypos: self.ypos,
            width: self.width,
            run: self.run,
            bindKeys: self.bindMovementKeys
        }
	}
    return {
        init: init
    }

})();

WebpongApp.init();
