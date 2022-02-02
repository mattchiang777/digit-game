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
    // Each digit must be unique
    for (let i = 0; i < 4; i++) {
        let digitAppearances = arr.filter(el => el == arr[i]);
        if (digitAppearances.length > 1) {
            console.log("Invalid submission. A digit is repeating");
            return false;
        }
    }
    return true;
}