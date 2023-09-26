const a = `22 13 17 11  0
8  2 23  4 24
21  9 14 16  7
6 10  3 18  5
1 12 20 15 19`;

const b = `3 15  0  2 22
9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6`;

const c = `14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

const rawBoards = [a, b, c];

const boardsIntoArrays = rawBoards.map(board => board.split(/\s+/));

const convertStringToNumber = arr => {
	return arr.map(subArr => subArr.map(Number));
};

const boards = convertStringToNumber(boardsIntoArrays);

const bingoNumbers = [
	7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 10, 16, 13, 6, 15, 25, 12, 22, 18,
	20, 8, 19, 3, 26, 1,
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

// Function to get an array of the indexes of the winner numbers in the board getIndexesOfWinnerBoards
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

const checkBingoNumbers = bingoNumbers => {
	let wonBoards = [];
	let drawnNumbers = [];

	for (const num of bingoNumbers) {
		if (wonBoards.length === boards.length) break;
		drawnNumbers.push(num);
		// If drawnNumbers are less than 5 we can't have a winner
		if (drawnNumbers.length < 5) continue;

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
	}
	return { wonBoards, drawnNumbers };
};

const { wonBoards, drawnNumbers } = checkBingoNumbers(bingoNumbers);

const IdxOfLastWinnerBoard = wonBoards.pop();
const numbersOfLastWinnerBoard = boards.slice(
	IdxOfLastWinnerBoard,
	IdxOfLastWinnerBoard + 1
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
