function Angrybirds() {

	var xPos, yPos;
	var canvas = document.createElement('CANVAS');
	var a, b, distance, time = 0, angle, vx, vy, velocity = 60, totalTime, drag;

	canvas.style.position = 'absolute';
	// canvas.style.left = xPos + 'px';
	// canvas.style.top = yPos + 'px';
	canvas.setAttribute("width", 900);
	canvas.setAttribute("height", 500);
	var xWidth = canvas.width;
	var yHeight = canvas.height;

	canvas.style.border = "2px solid black";
	canvas.setAttribute("id", "canv");

	document.body.appendChild(canvas);

	var c = document.getElementById("canv")
	var ctx = c.getContext("2d");

	var background = new Image();
	background.src = "background.png";


	var oldX = canvas.width / 2 - 280;
	var oldY = canvas.height / 2 + 120;

	var circle = {
		x: oldX,
		y: oldY,
		newX: 0,
		newY: 0,
		radius: 15,
		color: "red"
	};


	var ballHolder = {
		x: canvas.width / 2 - 350,
		y: canvas.height / 2 + 150,
		color: "brown"
	};

	function drawCircle() {

		// canvas.width=canvas.width;

		ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

		ctx.beginPath();
		// ctx.drawImage(background,0,0);
		ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI, false);
		// ctx.rect(rect.x,rect.y,rect.w,rect.h);
		ctx.fillStyle = circle.color;
		ctx.fill();
		ctx.closePath();

		// ctx.beginPath();
		// ctx.rect(ballHolder.x ,ballHolder.y ,30,100);
		// ctx.fillStyle = 'brown';
		// ctx.fill();
		// ctx.closePath();

		// //reference
		// ctx.beginPath();
		// ctx.moveTo(10, 300);
		// ctx.lineTo(10, canvas.height);
		// ctx.moveTo(10, 300);
		// ctx.lineTo(120, 300);
		// ctx.stroke();
		// ctx.closePath();

		//obstacle
		ctx.beginPath();
		ctx.moveTo(800, 200);
		ctx.lineTo(800, 300);
		ctx.lineWidth = 10;
		ctx.stroke();
		ctx.closePath();

		//center of circle line for target
		// ctx.beginPath();
		// ctx.moveTo( 115,300);
		// ctx.lineTo(115,400);
		// ctx.stroke();
		// ctx.closePath();

		// ctx.beginPath();
		// ctx.moveTo(50,370);
		// ctx.lineTo(200,370);
		// ctx.stroke();
		// ctx.closePath();

		// console.log(circle.x,circle.y);
	}
	// setInterval(drawCircle,10);



	drawCircle();


	function mouseDown(e) {
		if (circle.x - 20 <= e.clientX /*disabling left side click of circle*/ && circle.x + 20 >= e.clientX /*disabling right side click of circle*/
			&& circle.y - 20 <= e.clientY /*disabling top click of circle*/ && circle.y + 20 >= e.clientY) /*disabling bottom click of circle*/ {
			circle.x = e.clientX - canvas.offsetLeft;
			circle.y = e.clientY - canvas.offsetTop;
			drag = true;
			// console.log(circle.x,circle.y);
			canvas.onmousemove = mouseMove;

		}
	}

	function mouseMove(e) {
		if (drag == true) {


			if ((e.clientX <= 20 && e.clientY >= 305 && e.clientY <= canvas.height) || (e.clientX >= 20 && e.clientY <= 305 && e.clientX <= 130)) {
				circle.x = oldX;
				circle.y = oldY;

			}

			else {
				circle.x = e.clientX - 7;
				circle.y = e.clientY - 7;

				// circle.newX = e.clientX;
				// circle.newY = e.clientY;

				a = -(oldX - circle.x);
				b = oldY - circle.y;
				distance = Math.sqrt(a * a + b * b);

				angle = (Math.atan(b / a))/** 180 / Math.PI)*/;
			}
			drawCircle();
		}

		// drawCircle();

	}


	function moveBall() {
		time += 0.17;
		vx = distance * Math.cos(angle);
		vy = distance * Math.sin(angle);

		// totalTime= (2 * vx *Math.sin(angle)) / 9.8;
		circle.x = (oldX) + vx * time;
		circle.y = (oldY) - (vy * time - (9.81 / 2) * time * time);
		drawCircle();

		console.log(circle.x, circle.y);

		if (circle.x <= canvas.width && circle.y <= canvas.height - 50) {
			// requestAnimationFrame(moveBall);
			if (circle.x >= 800 && circle.y >= 200 && circle.y <= 300) {
				ctx.beginPath();
				ctx.font = "30px Arial";
				ctx.fillText("Win", 450, 250);
				ctx.closePath();

			}
			else {
				requestAnimationFrame(moveBall);
			}
		}
		else {
			alert("GAME OVER");
			location.reload();
		}





	}

	function mouseUP() {
		// drag = false;

		// console.log("up");
		console.log(distance, angle, time);


		if (drag == true) {
			moveBall();
			drag = false;
		}
		else {
			canvas.onmousemove = null;
		}

	}


	canvas.onmousedown = mouseDown;
	canvas.onmouseup = mouseUP;

}

window.onload = function () {

	var obj1 = Angrybirds();
	// obj1.createBird({
	// 	bxPos:100,
	// 	byPos:100,
	// 	bid:1
	// });	
}

