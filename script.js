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

// pegar botao status
const statusText = document.getElementById("status");

// montar tabuleiro

var tabuleiro = Array(25).fill(0);
var X = true;
clicked = false;
expanded = false;

setUpEventListeners();

function setUpEventListeners() {
	// Seleciona todos os elementos com a classe "square"
	const squares = document.querySelectorAll(".square, .inner-square");

	// Itera sobre os elementos, se necessário
	squares.forEach((square, index) => {
		console.log(`Square ${index + 1}:`, square);
	});

	squares.forEach((square) => {
		square.addEventListener("click", () => {
			let botaoClicado = document.createElement("img");
			botaoClicado.className = square.className;
			botaoClicado.id = square.id;
			indexTabuleiro = botaoClicado.id;
			console.log(botaoClicado.className);

			if (
				(botaoClicado.className == "square" && expanded) ||
				botaoClicado.className == "inner-square"
			) {
				clicked = true;

				if (expanded) {
					botaoClicado.style.opacity = 1;
				}

				if (X) {
					botaoClicado.src = "images/X.jpg";
					statusText.textContent = "Vez de O";
					tabuleiro[indexTabuleiro - 1] = "X";
					console.log(tabuleiro);
				} else {
					botaoClicado.src = "images/O.jpg";
					statusText.textContent = "Vez de X";
					tabuleiro[indexTabuleiro - 1] = "O";
					console.log(tabuleiro);
				}
				X = !X;

				square.replaceWith(botaoClicado);
			}
		});
	});
}

function reset() {
	console.log("botao reset apertado");
	console.log(tabuleiro);

	let changedSquares = document.querySelectorAll(".square, .inner-square");

	changedSquares.forEach((square) => {
		let imagem = document.createElement("img");
		imagem.src = "images/N.jpg";
		imagem.className = square.className;
		imagem.id = square.id;

		square.replaceWith(imagem);
	});

	if (clicked) {
		statusText.textContent = "Bora pra próxima";
		clicked = false;
	} else {
		statusText.textContent = "porra tu nem jogo ainda e já quer resetar???";
	}
	tabuleiro = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	setUpEventListeners();
	expandTabuleiro();
}

function winingStatus() {
	winingCombinationsLevel1 = [
		[6, 7, 8],
		[11, 12, 13],
		[16, 17, 18],
		[6, 11, 16],
		[7, 12, 17],
		[8, 13, 18],
		[6, 12, 18],
		[8, 12, 16],
	];
}

function expandTabuleiro() {
	expanded = true;
	squaresModified = document.querySelectorAll(".square");
	squaresModified.forEach((item) => {
		item.style.opacity = 1;
	});
}
const restartButton = document.getElementById("restart");
restartButton.addEventListener("click", reset);
