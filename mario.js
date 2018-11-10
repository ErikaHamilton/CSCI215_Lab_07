// JavaScript for creating interactive animations on a canvas
////////////////////////////////////////////////////////////////////
//Erika Hamilton --- Lab 07
// ----------------------------------------------- BUG NOTES:
	// 1) Line 58-62, Bug issue: Originally had this seperate marioImage.onload = function (),
	// but it would only load him after the user hits Enter. I assume this may be because of the way JS executes
	// 2) Once Mario is moving either Left or Right and the user hit Jumps, he will disappear until enter is hit again
	// 3) faceForward Timeout still is not working.
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
		y: 600,
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
		ctx.drawImage(marioImage, 100, 615, 50, 80);

    }


	// marioImage.onload = function ()
	// {
	// 	ctx.drawImage(marioImage, 100, 615, 50, 80);
	// };


	/////////////////////////////////////////////////////////////////
	var render = function () {
		ctx.drawImage(bgImage, 0, 0);
		renderMario();
	}
	function renderMario(){
		//PERSONAL TO DO: Make the music pause when the space bar is hit
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
		else{
			Mario.moving = "no";
			marioImage.src = "mario1.png";
			ctx.drawImage(marioImage, Mario.x, Mario.y, Mario.w, Mario.h);
			clearInterval(Mario.timer); // kills the timer
		}
	}
	///////////////////////////////////////////////////////////////////

	// ----------------------------------- MOVEMENT LISTENER

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
				Mario.timer = setTimeout(faceForward, 200);
				leftTurn(Mario.moving);
    	}
			//move right
			if(keycode === 39 && Mario.x <= 1145) {
				Mario.moving = "right";
				Mario.x += 5;
				//Coule be causing the flickering problem?
				marioImage.src = "marioturnsright.png";
				ctx.drawImage(marioImage, Mario.x, Mario.y, Mario.w, Mario.h);
				Mario.timer = setTimeout(faceForward, 200);
				rightTurn(Mario.moving);
			}
} //Closes onkeydown function

//-----------------------------------------------Turning Left Function
function leftTurn () {
	ctx.drawImage(bgImage, 0, 0);
	Mario.Image.src = "marioturnsleft.png";
	ctx.drawImage(marioImage, Mario.x, Mario.y, Mario.w, Mario.h);
	 faceForward(setTimeout(faceForward, 200));
	//preventing Mario from walking off the edge
	if(Mario.moving == "left" && Mario.x > 0) {
		Mario.x -= 5;
	}
} //close left

//---------------------------------------------Turning Right Function
function rightTurn () {
	ctx.drawImage(bgImage, 0, 0);
	Mario.Image.src = "marioturnsright.png";
	ctx.drawImage(marioImage, Mario.x, Mario.y, Mario.w, Mario.h);
	faceForward(setTimeout(faceForward, 200));
	//preventing Mario from walking off the edge
	if(Mario.moving == "right" && Mario.x <= 1145) {
		Mario.x += 5;
	}
		// clearInterval(Mario.timer);
} //close right

function faceForward() {
	ctx.drawImage(bgImage, 0, 0);
	Mario.Image.src = "mario1.png"
	ctx.drawImage(marioImage, Mario.x, Mario.y, Mario.w, Mario.h);
	clearTimeout();
    }

}
//close draw() function
