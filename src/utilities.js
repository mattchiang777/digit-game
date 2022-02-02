// Generate the winning combo that is the 4 digit sequence the player is trying to guess
export function generateWinningCombo() {
    let winningCombo = [];
    let nextDigit;

    for (let i = 0; i < 4; i++) {

      nextDigit = getRandomDigit();
  
      if (!winningCombo.includes(nextDigit)) {
        winningCombo[i] = nextDigit;
      } else {
        while (winningCombo.includes(nextDigit)) {
          nextDigit = getRandomDigit();
        }
        winningCombo[i] = nextDigit;
      }
    }
    
    return winningCombo
  }

function getRandomDigit() {
    return getRandomInt(0, 10)
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

export function isSubmissionValid(arr) {
    // Submission must have 4 digits
    if (arr.length != 4) { 
        console.log("Number of digits entered was not 4");
        return false;
    }
    // Each digit must be unique
    let digitDict = createDigitDict();
    let keys = Object.keys(digitDict);
    for (const el of arr) {
        if (!keys.includes(el)) {
            console.log("Invalid character entered is not 0-9");
            return false;
        }
        if (digitDict[el] == true) {
            console.log("Invalid submission. A digit is repeating");
            return false;
        }
        digitDict[el] = true;
    }

    // Double check
    let checkedArr = [];
    for (const digit of arr) {
        // console.log(digit);
        if (digitDict[digit] == true) {
            checkedArr.push(digit);
        }
    }
    // console.log("Do these digits match the user submission?: " + arr + " vs. " + checkedArr);
    return true;
}

function createDigitDict() {
    let digitDict = {}
    for (let i = 0; i < 10; i++) {
        digitDict[i] = false;
    }
    return digitDict;
}