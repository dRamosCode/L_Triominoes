class Board {
	constructor(level, holeX, holeY) {
		this.size = 2 ** level;
		this.holeX = holeX;
		this.holeY = holeY;
		this.cells = []; //Array of strings "hole/top/right/bottom/left"
	}

	//Initialize cell values
	init() {
		//Loop through all cells and empty them
		for (let row = 0; row < this.size; row++) {
			for (let col = 0; col < this.size; col++) {
				this.cells[[col, row]] = "";
			}
		}
	}

	//Recursive function to solve board
	solve(level, originX, originY, holeX, holeY) {
		//Exit if recursion is finished
		if (level == 0) {
			return;
		}

		//Board size
		let size = 2 ** level;
		//Board quadrant size
		let sizeQ = 2 ** (level - 1);
		//Hole quadrant
		let holeQ = 0;

		//Find quadrant with hole
		if (holeY < originY + sizeQ) {
			if (holeX < originX + sizeQ) {
				holeQ = 1;
			} else {
				holeQ = 2;
			}
		} else {
			if (holeX < originX + sizeQ) {
				holeQ = 4;
			} else {
				holeQ = 3;
			}
		}

		//Solve board recursively depending of hole quadrant
		switch (holeQ) {
			case 1:
				//Create L-triominoe in adyacent cells of corner of quarter
				this.cells[[originX + sizeQ, originY + sizeQ - 1]] += "bottom"; //2º quadrant
				this.cells[[originX + sizeQ, originY + sizeQ]] += "topleft"; //3º quadrant
				this.cells[[originX + sizeQ - 1, originY + sizeQ]] += "right"; //4º quadrant

				//Solve recursively quadrants in order
				this.solve(level - 1, originX, originY, holeX, holeY); //1º -Real hole
				this.solve(level - 1, originX + sizeQ, originY, originX + sizeQ, originY + sizeQ - 1); //2º - Fictional hole bottomleft
				this.solve(level - 1, originX + sizeQ, originY + sizeQ, originX + sizeQ, originY + sizeQ); //3º - Fictional hole topleft
				this.solve(level - 1, originX, originY + sizeQ, originX + sizeQ - 1, originY + sizeQ); //4º - Fictional hole topright

				break;
			case 2:
				//Create L-triominoe in adyacent cells of corner of quarter
				this.cells[[originX + sizeQ - 1, originY + sizeQ - 1]] += "bottom"; //1º quadrant
				this.cells[[originX + sizeQ, originY + sizeQ]] += "left"; //3º quadrant
				this.cells[[originX + sizeQ - 1, originY + sizeQ]] += "topright"; //4º quadrant

				//Solve recursively quadrants in order
				this.solve(level - 1, originX, originY, originX + sizeQ - 1, originY + sizeQ - 1); //1º - Fictional hole bottomright
				this.solve(level - 1, originX + sizeQ, originY, holeX, holeY); //2º - Real hole
				this.solve(level - 1, originX + sizeQ, originY + sizeQ, originX + sizeQ, originY + sizeQ); //3º - Fictional hole topleft
				this.solve(level - 1, originX, originY + sizeQ, originX + sizeQ - 1, originY + sizeQ); //4º - Fictional hole topright

				break;
			case 3:
				//Create L-triominoe in adyacent cells of corner of quarter
				this.cells[[originX + sizeQ - 1, originY + sizeQ - 1]] += "bottomright"; //1º quadrant
				this.cells[[originX + sizeQ, originY + sizeQ - 1]] += "left"; //2º quadrant
				this.cells[[originX + sizeQ - 1, originY + sizeQ]] += "top"; //4º quadrant

				//Solve recursively quadrants in order
				this.solve(level - 1, originX, originY, originX + sizeQ - 1, originY + sizeQ - 1); //1º - Fictional hole bottomright
				this.solve(level - 1, originX + sizeQ, originY, originX + sizeQ, originY + sizeQ - 1); //2º - Fictional hole bottomleft
				this.solve(level - 1, originX + sizeQ, originY + sizeQ, holeX, holeY); //3º - Real hole
				this.solve(level - 1, originX, originY + sizeQ, originX + sizeQ - 1, originY + sizeQ); //4º - Fictional hole topright

				break;
			case 4:
				//Create L-triominoe in adyacent cells of corner of quarter
				this.cells[[originX + sizeQ - 1, originY + sizeQ - 1]] += "right"; //1º quadrant
				this.cells[[originX + sizeQ, originY + sizeQ - 1]] += "leftbottom"; //2º quadrant
				this.cells[[originX + sizeQ, originY + sizeQ]] += "top"; //3º quadrant

				//Solve recursively quadrants in order
				this.solve(level - 1, originX, originY, originX + sizeQ - 1, originY + sizeQ - 1); //1º - Fictional hole bottomright
				this.solve(level - 1, originX + sizeQ, originY, originX + sizeQ, originY + sizeQ - 1); //2º - Fictional hole bottomleft
				this.solve(level - 1, originX + sizeQ, originY + sizeQ, originX + sizeQ, originY + sizeQ); //3º - Fictional hole topleft
				this.solve(level - 1, originX, originY + sizeQ, holeX, holeY); //4º - Real hole

				break;
		}
	}

	//ASCII print board
	print() {
		//Variables
		let topRow = "";
		let centerRow = "";
		let output = "";

		//Loop through all rows
		for (let row = 0; row < this.size; row++) {
			//Leftmost character
			topRow += "+";
			centerRow += "|";

			//Loop through all cols
			for (let col = 0; col < this.size; col++) {
				//Top wall
				if (this.cells[[col, row]].includes("top")) {
					topRow += "  +";
				} else {
					topRow += "--+";
				}
				//Cell content
				if (this.cells[[col, row]].includes("hole")) {
					centerRow += "##";
				} else {
					centerRow += "  ";
				}
				//Right wall
				if (this.cells[[col, row]].includes("right")) {
					centerRow += " ";
				} else {
					centerRow += "|";
				}
			}

			//Mix top and center and clear variables
			output += topRow;
			output += "\n";
			output += centerRow;
			output += "\n";
			topRow = "";
			centerRow = "";
		}

		//Last row - bottom wall
		output += "+";
		for (let col = 0; col < this.size; col++) {
			output += "--+";
		}

		//Return output
		return output;
	}
}

// Game input
const n = parseInt(readline()); //Level 2^level = square size
var inputs = readline().split(" ");
const holeX = parseInt(inputs[0]); // X of empty square
const holeY = parseInt(inputs[1]); // Y of empty square

//Create new board
let board = new Board(n, holeX, holeY);

//Initialize cells
board.init();

//Add hole
board.cells[[holeX, holeY]] = "hole";

//Solve board
board.solve(n, 0, 0, holeX, holeY);

//Get board
let output = board.print();

//Debug
console.error("holeX:" + holeX, "holeY:" + holeY, "Level:" + n + "\n");

//Print output
console.log(output);
