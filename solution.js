import { boards } from './db';

const bingoNumbers = [
	1, 76, 38, 96, 62, 41, 27, 33, 4, 2, 94, 15, 89, 25, 66, 14, 30, 0, 71, 21,
	48, 44, 87, 73, 60, 50, 77, 45, 29, 18, 5, 99, 65, 16, 93, 95, 37, 3, 52, 32,
	46, 80, 98, 63, 92, 24, 35, 55, 12, 81, 51, 17, 70, 78, 61, 91, 54, 8, 72, 40,
	74, 68, 75, 67, 39, 64, 10, 53, 9, 31, 6, 7, 47, 42, 90, 20, 19, 36, 22, 43,
	58, 28, 79, 86, 57, 49, 83, 84, 97, 11, 85, 26, 69, 23, 59, 82, 88, 34, 56,
	13,
];

// All possible rows & columns that can win in a board
const winnerSets = [
	[0, 1, 2, 3, 4],
	[5, 6, 7, 8, 9],
	[10, 11, 12, 13, 14],
	[15, 16, 17, 18, 19],
	[20, 21, 22, 23, 24],
	[0, 5, 10, 15, 20],
	[1, 6, 11, 16, 21],
	[2, 7, 12, 17, 22],
	[3, 8, 13, 18, 23],
	[4, 9, 14, 19, 24],
];

// Function to determine if a board has won
const isWinner = boardWinnerNumbersIndexes => {
	let hasWon = false;
	// Check all columns and rows to see if we have all 5 winner numbers
	winnerSets.map(winnerSet => {
		const amountOfWins = winnerSet.filter(winNumber =>
			boardWinnerNumbersIndexes.includes(winNumber)
		);
		if (amountOfWins.length === 5) {
			hasWon = true;
			return;
		}
	});
	return hasWon;
};

// Function to get an array of the indexes of the winner numbers in the board
const getIndexesOfWinnerBoards = (boardNumbers, drawnNumbers) => {
	let indexesOfNumbersInWinnerBoard = [];
	for (const drawnNum of drawnNumbers) {
		const idxOfNumberInWinnerBoard = boardNumbers.findIndex(
			number => number === drawnNum
		);
		if (idxOfNumberInWinnerBoard !== -1)
			indexesOfNumbersInWinnerBoard.push(idxOfNumberInWinnerBoard);
	}
	return indexesOfNumbersInWinnerBoard;
};

// Function to check if there is a winner board
const checkForWinnerBoard = (boards, wonBoards, drawnNumbers) => {
	boards.map((boardNumbers, boardIndex) => {
		// If board has won just return
		if (wonBoards.includes(boardIndex)) return;
		const indexesOfNumbersInWinnerBoard = getIndexesOfWinnerBoards(
			boardNumbers,
			drawnNumbers
		);

		// We can't win with less than 5 winning numbers
		if (indexesOfNumbersInWinnerBoard.length >= 5) {
			if (isWinner(indexesOfNumbersInWinnerBoard)) {
				wonBoards.push(boardIndex);
			}
		}
	});
};

// Function to get the winning boards in order and the bingo numbers
const checkBingoNumbers = bingoNumbers => {
	let wonBoards = [];
	let drawnNumbers = [];

	for (const num of bingoNumbers) {
		if (wonBoards.length === boards.length) break;
		drawnNumbers.push(num);
		// If drawnNumbers are less than 5 we can't have a winner
		if (drawnNumbers.length < 5) continue;

		checkForWinnerBoard(boards, wonBoards, drawnNumbers);
	}
	return { wonBoards, drawnNumbers };
};

const { wonBoards, drawnNumbers } = checkBingoNumbers(bingoNumbers);

const idxOfLastWinnerBoard = wonBoards.pop();
const numbersOfLastWinnerBoard = boards.slice(
	idxOfLastWinnerBoard,
	idxOfLastWinnerBoard + 1
)[0];
const lastBoardLeftoverNumbers = numbersOfLastWinnerBoard.filter(
	number => !drawnNumbers.includes(number)
);

const lastDrawnNumber = drawnNumbers.pop();
const sumBoardNumbers = lastBoardLeftoverNumbers.reduce(
	(accumulator, currentValue) => accumulator + currentValue
);

const finalScore = lastDrawnNumber * sumBoardNumbers;

console.log(finalScore);
