const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext('2d');
ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;
let particleArray;

//create constructor function
function Particle(x, y, directionX, directionY, size, color){
	this.x = x;
	this.y = y;
	this.directionX = directionX;
	this.directionY = directionX;
	this.size = size;
	this.color = color;
}
//add draw method to particle prototype
Particle.prototype.draw = function(){
	ctx.beginPath();
	ctx.arc(this.x, this.y, this.size, 0, Math.PI*2, false);
	ctx.fillStyle = this.color;
	ctx.fill();
}
/* const particle1 = new Particle(100,100,1,1,20,'white');
particle1.draw(); */
//add update method to particle prototype
Particle.prototype.update = function(){
	if(this.x + this.size > canvas.width || this.x - this.size < 0){
		this.directionX = -this.directionX;
	}
	if(this.y + this.size > canvas.height || this.y - this.size < 0){
		this.directionY = -this.directionY;
	}
	this.x += this.directionX;
	this.y += this.directionY;
	this.draw();
}
//create particle array
function init(){
	particleArray = [];
	for(let i=0;i<400;i++){ // to change no. of particles
		let size = Math.random() * 20;
		let x = Math.random() * (innerWidth - size*2);
		let y = Math.random() * (innerHeight - size*2);
		let directionX = (Math.random() * .9) - .4; // to change size of particle .3 .5, .6 .5
		let directionY = (Math.random() * .9) - .5; // to change size of particle
		let color = "#ecf0f1"; // to change color of particle

		particleArray.push(new Particle(x, y, directionX, directionY, size, color));
	}
}
//animation loop
function animate(){
	requestAnimationFrame(animate);
	ctx.clearRect(0,0, innerWidth, innerHeight);

	for(let i=0;i<particleArray.length;i++){
		particleArray[i].update();
	}
}
init();
animate();

window.addEventListener('resize',
	function(){
		canvas.width = innerWidth;
		canvas.height = innerHeight;
		init();
	}
)