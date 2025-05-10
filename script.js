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

// pegar placar
const pontosX = document.getElementById("score-x");
const pontosO = document.getElementById("score-o");

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
				winingStatus();
			}
		});
	});
}

function reset() {
	tabuleiro = Array(25).fill(0);
	expanded = false;
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
	setUpEventListeners();
}

function expandTabuleiro() {
	expanded = true;
	squaresModified = document.querySelectorAll(".square");
	squaresModified.forEach((item) => {
		item.style.opacity = 1;
	});
}

function winingStatus() {
	winingCombinationsLevel1 = [
		//index do tabuleiro
		[6, 7, 8],
		[11, 12, 13],
		[16, 17, 18],
		[6, 11, 16],
		[7, 12, 17],
		[8, 13, 18],
		[6, 12, 18],
		[8, 12, 16],
	];

	winingCombinationsLevel1.forEach((combination) => {
		if (
			tabuleiro[combination[0]] === tabuleiro[combination[1]] &&
			tabuleiro[combination[1]] === tabuleiro[combination[2]] &&
			tabuleiro[combination[0]] !== 0 &&
			tabuleiro[combination[0]] !== "GX" &&
			tabuleiro[combination[0]] !== "GO"
		) {
			if (tabuleiro[combination[0]] == "X") {
				pontosX.textContent = parseInt(pontosX.textContent) + 1;
			} else if (tabuleiro[combination[0]] == "O") {
				pontosO.textContent = parseInt(pontosO.textContent) + 1;
			}
			expandTabuleiro();

			combination.forEach((item) => {
				var victorySquare = document.getElementById(String(item + 1));
				if (victorySquare.src.endsWith("images/X.jpg")) {
					tabuleiro[item] = "GX";
					victorySquare.src = "images/green_X.jpg";
				} else if (victorySquare.src.endsWith("images/O.jpg")) {
					tabuleiro[item] = "GO";
					victorySquare.src = "images/green_O.jpg";
				}
			});
		}
	});

	winingCombinationsLevel2 = [
		// horiz
		[0, 1, 2],
		[1, 2, 3],
		[2, 3, 4],
		[5, 6, 7],
		[7, 8, 9],
		[10, 11, 12],
		[12, 13, 14],
		[15, 16, 17],
		[17, 18, 19],
		[20, 21, 22],
		[21, 22, 23],
		[22, 23, 24],
		//vertical
		[0, 5, 10],
		[5, 10, 15],
		[10, 15, 20],
		[1, 6, 11],
		[11, 16, 21],
		[2, 7, 12],
		[12, 17, 22],
		[3, 8, 13],
		[13, 18, 23],
		[4, 9, 14],
		[9, 14, 19],
		[14, 19, 24],
		//diagonal esq p dir
		[0, 6, 12],
		[1, 7, 13],
		[2, 8, 14],
		[5, 11, 17],
		[7, 13, 19],
		[10, 16, 22],
		[11, 17, 23],
		[12, 18, 24],
		//diagonal dir p esq
		[2, 6, 10],
		[3, 7, 11],
		[4, 8, 12],
		[7, 11, 15],
		[9, 13, 17],
		[12, 16, 20],
		[13, 17, 21],
		[14, 18, 22],
	];
	winingCombinationsLevel2.forEach((combination) => {
		if (
			tabuleiro[combination[0]] !== 0 &&
			!tabuleiro[combination[0]].startsWith("G") &&
			tabuleiro[combination[0]] === tabuleiro[combination[1]] &&
			tabuleiro[combination[1]] === tabuleiro[combination[2]]
		) {
			if (tabuleiro[combination[0]] == "X") {
				pontosX.textContent = parseInt(pontosX.textContent) + 1;
			} else if (tabuleiro[combination[0]] == "O") {
				pontosO.textContent = parseInt(pontosO.textContent) + 1;
			}

			combination.forEach((item) => {
				var victorySquare = document.getElementById(String(item + 1));
				if (victorySquare.src.endsWith("images/X.jpg")) {
					tabuleiro[item] = "GX";
					victorySquare.src = "images/green_X.jpg";
				} else if (victorySquare.src.endsWith("images/O.jpg")) {
					tabuleiro[item] = "GO";
					victorySquare.src = "images/green_O.jpg";
				}
			});
		}
	});
}
const restartButton = document.getElementById("restart");
restartButton.addEventListener("click", reset);
