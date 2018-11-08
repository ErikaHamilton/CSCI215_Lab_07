// JavaScript for creating interactive animations on a canvas
////////////////////////////////////////////////////////////////////
// Create a Mario object which contains all the info about Mario
// Objects are nice because they allow up to keep all the relevant
// info about an item in one place.

var Mario;
////////////////////////////////////////////////////////////////////
window.onload = init; // calls the function named "init"
// declare the background image
var bgImage = new Image();
// ----------------------------------- INITALIZE MARIO
// Is called when the window loads;
function init() {
marioImage = new Image();
bgImage = new Image();
	// Initialize Mario Object
	Mario = {
		x: 100,
		y: 615,
		w: 50,
		h: 80,
		JumpSound: new Audio('jump.wav'),
		BackgroundSound: new Audio('mario_08.wav'),
		Image: (function() {
			var temp = new Image();
			temp.src = "mario1.png";
			return temp;})(),
		moving: "no",
		timer: "",
		timerInterval: 10
	};
//Causes issues?
	marioImage.src = "mario1.png";
	bgImage.src = "marioBG.jpg";
	draw();

}

////////////////////////////////////////////////////////////////////
// ----------------------------------- DRAWS INITALIZED MARIO
function draw() {

	// Get Drawing Area
	var ctx = document.getElementById("mario_canvas").getContext("2d");

	// If you want to display images on the canvas when it is initially
	// loaded, you must do it this way
	bgImage.onload = function(){
		ctx.drawImage(bgImage, 0, 0);
    }
	//Draws starting mario
	Mario.onload = function ()
	{
		ctx.drawImage(marioImage, 105, 204);
	};



	/////////////////////////////////////////////////////////////////
	var render = function () {
		ctx.drawImage(bgImage, 0, 0);
		renderMario();
	}

	/*
	 * TODO: Alter the y coordinates so Mario will jump while on the ground
	 */
	function renderMario(){

		//make the space bar pause??
		Mario.BackgroundSound.play();

		if (Mario.y > 500 && Mario.moving == "up") {
			Mario.Image.src = "mario2.png";
			ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
			// Changes the y value each time
			Mario.y -= 5; // move 5 px up
		}else if(Mario.y <= 500 && Mario.moving == "up"){
			Mario.moving = "down";
		} else if(Mario.y < 623 && Mario.moving == "down"){
			Mario.Image.src = "mario2.png";
			ctx.drawImage(Mario.Image, Mario.x, Mario.y, Mario.w, Mario.h);
			Mario.y += 5; // move 5 px back down after a jump
		}else if(Mario.y == 623 && Mario.moving == "no"){
			Mario.moving = "up";
		}
		// else if(Mario.y == 623 && Mario.moving == "right"){
		//
		// }
		// else if(Mario.moving == "left"){
		//
		// }
		else{
			Mario.moving = "no";
			marioImage.src = "mario1.png";
			ctx.drawImage(marioImage, Mario.x, Mario.y, Mario.w, Mario.h);
			clearInterval(Mario.timer); // kills the timer
		}
	}
	///////////////////////////////////////////////////////////////////

	// ----------------------------------- MOVEMENT LISTENER
	 // * TODO: Add code to set Mario image to proper image whether L or R button pressed

	document.body.onkeydown = function(e) {  // listen for a key
  	e = event || window.event;             // any kind of event
    var keycode = e.charCode || e.keyCode; // any kind of key
		console.log(keycode);
		// The user wants Mario to jump:
			if(keycode === 13 ) {
				Mario.moving = "up";
				Mario.JumpSound.play();
				Mario.timer = setInterval(render, Mario.timerInterval);
			} //move left
			if(keycode === 37 && Mario.x > 0) {
				Mario.moving = "left";
				marioImage.src = "marioturnsleft.png";
				ctx.drawImage(marioImage, Mario.x, Mario.y, Mario.w, Mario.h);
				Mario.timer = setInterval(leftTurn, 100);
				Mario.timer = setTimeout(faceForward, 200);
				// Mario.timer = setInterval(render, Mario.timerInterval);

    	}
			//move right
			if(keycode === 39 && Mario.x <= 1145) {
				Mario.moving = "right";
				Mario.x += 5;
				marioImage.src = "marioturnsright.png";
				ctx.drawImage(marioImage, Mario.x, Mario.y, Mario.w, Mario.h);
				Mario.timer = setInterval(rightTurn, 100);
				Mario.timer = setTimeout(faceForward, 200);
				// Mario.timer = setInterval(render, Mario.timerInterval);
			}
} //Closes onkeydown function

//-----------------------------------------------Turning Left Function
function leftTurn () {
	ctx.drawImage(bgImage, 0, 0);
	marioImage.src = "marioturnsleft.png";
	ctx.drawImage(marioImage, Mario.x, Mario.y, Mario.w, Mario.h);
	//preventing Mario from walking off the edge
	if(Mario.moving == "left" && Mario.x > 0) {
		Mario.x -= 5;
	}
	//Interval issue? or drawing the wrong image?
	// clearInterval(Mario.timer);
} //close left

//---------------------------------------------Turning Right Function
function rightTurn () {
	ctx.drawImage(bgImage, 0, 0);
	marioImage.src = "marioturnsright.png";
	ctx.drawImage(marioImage, Mario.x, Mario.y, Mario.w, Mario.h);
	//preventing Mario from walking off the edge
	if(Mario.moving == "right" && Mario.x <= 1145) {
		Mario.x += 5;
	}
	// clearInterval(Mario.timer);
} //close right

function faceForward() {
	ctx.drawImage(bgImage, 0, 0);
	marioImage.src = "mario1.png"
	ctx.drawImage(marioImage, Mario.x, Mario.y, Mario.w, Mario.h);
	// clearInterval(Mario.timer);

    }

}
//close draw() function
