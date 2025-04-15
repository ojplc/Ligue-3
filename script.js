/* const square1 = document.getElementById("1");
const square2 = document.getElementById("2");
const square3 = document.getElementById("3");
const square4 = document.getElementById("4");
const square5 = document.getElementById("5");
const square6 = document.getElementById("6");
const square7 = document.getElementById("7");
const square8 = document.getElementById("8");
const square9 = document.getElementById("9");

*/

// Seleciona todos os elementos com a classe "square"
const squares = document.querySelectorAll(".square");

// Itera sobre os elementos, se necessário
squares.forEach((square, index) => {
	console.log(`Square ${index + 1}:`, square);
});

// pegar botao status
const statusText = document.getElementById("status");

// montar tabuleiro

var tabuleiro = [0, 0, 0, 
				0, 0, 0, 
				0, 0, 0];
var X = true;
clicked = false;
squares.forEach((square) => {
	square.addEventListener("click", () => {
		clicked = true;
		let botaoClicado = document.createElement("img");

		botaoClicado.className = square.className;
		botaoClicado.id = square.id;
		indexTabuleiro = botaoClicado.id;

		if (X) {
			botaoClicado.src = "images/X.jpg";
			statusText.textContent = "Vez de O";
			tabuleiro[indexTabuleiro - 1] = "X";
		} else {
			botaoClicado.src = "images/O.jpg";
			statusText.textContent = "Vez de X";
			tabuleiro[indexTabuleiro - 1] = "O";
		}
		X = !X;

		square.replaceWith(botaoClicado);
	});
});

function reset() {
	console.log("botao reset apertado");
	console.log(tabuleiro);
	let squaresNow = document.querySelectorAll(".square");

	squaresNow.forEach((squareNow, index) => {
		squareNow.replaceWith(squares[index]);
	});

	if (clicked) {
		statusText.textContent = "Bora pra próxima";
	} else {
		statusText.textContent = "porra tu nem jogo ainda e já quer resetar???";
	}
	tabuleiro = [0, 0, 0, 0, 0, 0, 0, 0, 0];
}

function winingStatus() {
	winingCombinations = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];
}


const restartButton = document.getElementById("restart");
restartButton.addEventListener("click", reset);
