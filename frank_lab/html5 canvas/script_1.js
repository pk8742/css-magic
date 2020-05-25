const canvas = document.getElementById("canvas-1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];


class Particle{
	constructor(moveRadius, step, position, size){
		this.moveRadius = moveRadius;
		this.step = step;
		this.position = position;
		this.size = size;
	}
	draw(){
		ctx.beginPath();
		ctx.arc(Math.cos(this.position)*this.moveRadius + canvas.width/2,
		Math.sin(this.position)*this.moveRadius + canvas.height/2,
		this.size, 0, Math.PI*2);
		ctx.closePath();
		ctx.fillStyle = "white";
		ctx.fill();
		//ctx.strokeStyle = "white";
		//ctx.stroke();
	}
	update(){
		this.position += this.step;
		this.draw();
	}
}

function init(){
	particleArray = [];
	for(let i=0;i<500;i++){ //no. of particles
		let moveRadius = Math.random() * canvas.width;
		let step = (Math.random()*0.002)+0.002;
		let position = Math.random() * (Math.PI*2);
		let size = (Math.random() * 8) + 0.5; //size of the particles 8 0.5, 12 3

		particleArray.push(new Particle(moveRadius, step, position, size));

	}
}

function animate(){
	requestAnimationFrame(animate); // background-color fillStyle
	ctx.fillStyle = 'rgba(59,59,152, 0.01)'; // fii style of particles like 0.1,0.01
	ctx.fillRect(0,0,innerWidth,innerHeight);

	for(let i=0;i<particleArray.length;i++){
		particleArray[i].update();
	}
}
init();
animate();

window.addEventListener("resize",
	function(){
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		init();
	}
)

function drawStar(positionX, positionY, spikes, outerRadius, innerRadius){
	let rotation = Math.PI/2 * 3;
	let x = positionX;
	let y = positionY;
	letstep = Math.PI / spikes;

	ctx.beginPath();
	ctx.moveTo(positionX, positionY - outerRadius);
	for(let i=0;i<spikes;i++){
		x = positionX + Math.cos(rotation) * outerRadius;
		y = positionY + Math.sin(rotation) * outerRadius;
		ctx.lineTo(x,y);
		rotation += step;

		x = positionX + Math.cos(rotation) * innerRadius;
		y = positionY + Math.sin(rotation) * innerRadius;
		ctx.lineTo(x,y);
		rotation += step;
	}
	ctx.lineTo(positionX, positionY - outerRadius);
	ctx.closePath();
}