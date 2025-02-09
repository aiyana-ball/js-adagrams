const DISTRIBUTION_OF_LETTERS = {
  "A": 9,
  "B": 2,
  "C": 2,
  "D": 4,
  "E": 12,
  "F": 2,
  "G": 3,
  "H": 2,
  "I": 9,
  "J": 1,
  "K": 1,
  "L": 4,
  "M": 2,
  "N": 6,
  "O": 8,
  "P": 2,
  "Q": 1,
  "R": 6,
  "S": 4,
  "T": 6,
  "U": 4,
  "V": 2,
  "W": 2,
  "X": 1,
  "Y": 2,
  "Z": 1
};


const SCORE_CHART = {
  "A": 1,
  "B": 3,
  "C": 3,
  "D": 2,
  "E": 1,
  "F": 4,
  "G": 2,
  "H": 4,
  "I": 1,
  "J": 8,
  "K": 5,
  "L": 1,
  "M": 3,
  "N": 1,
  "O": 1,
  "P": 3,
  "Q": 10,
  "R": 1,
  "S": 1,
  "T": 1,
  "U": 1,
  "V": 4,
  "W": 4,
  "X": 8,
  "Y": 4,
  "Z": 10
}

export const drawLetters = () => {
  let lettersDrawn = [];
  let availableLetters = [];

for (let letter in DISTRIBUTION_OF_LETTERS) {
  availableLetters.push(letter);
}

while (lettersDrawn.length <= 9) {
  let letterChoice = availableLetters[Math.floor(Math.random() * availableLetters.length)];
  let letterCount = lettersDrawn.filter(letter => letter === letterChoice).length;
  
  if (letterCount < DISTRIBUTION_OF_LETTERS[letterChoice]) {
    lettersDrawn.push(letterChoice);
  }
}

return lettersDrawn
};


export const usesAvailableLetters = (input, lettersInHand) => {
  input = input.toUpperCase();
  
  for (let letter of input) {
    letter = letter.toUpperCase();
    let frequencyInWord = input.split('').filter(l => l == letter).length;
    let frequencyInBank = lettersInHand.filter(l => l === letter).length;

    if (frequencyInBank < frequencyInWord) {
      return false;
    }
  }
  
  return true;
};


export const scoreWord = (word) => {
  let scoreTotal = 0;
  for (let letter of word) {
    letter = letter.toUpperCase();
    let letterPoints = SCORE_CHART[letter];
    scoreTotal += letterPoints;
  }
  if (word.length >= 7) {
    scoreTotal += 8;
  }
  return scoreTotal
};


export const highestScoreFrom = (words) => {
  let highestScore = 0;
  let highestWord = "";

  for (let word of words) {
    let score = scoreWord(word);

    if (score > highestScore) {
      highestScore = score;
      highestWord = word;
    } else if (score === highestScore) {
      if (word.length === highestWord.length) {
        continue;
      } else if (word.length === 10) {
        highestWord = word;
      } else if (word.length < highestWord.length && highestWord.length !== 10) {
        highestWord = word;
      }
    }
  }

  let wordAndScore = {"score": highestScore, "word": highestWord};
  return wordAndScore;
};
