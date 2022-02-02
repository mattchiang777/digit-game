import React, { useState, useEffect } from 'react';
import RICIBs from 'react-individual-character-input-boxes';
import logo from './jack.png';
import './App.css';
import { generateWinningCombo, isSubmissionValid } from './utilities';

const winningCombo = generateWinningCombo();
console.log("The winning combo is " + winningCombo);

function App() {

  const [A, setA] = useState(0);
  const [B, setB] = useState(0);
  const [numAttempts, setNumAttempts] = useState(0);
  const [userGuess, setUserGuess] = useState("");

  useEffect(() => {
    console.log("Your clues: " + A + "A" + " " + B + "B");
    showResult();
    resetHintState();
  }, [A, B]);

  const handleUserInput = (str) => {
    setUserGuess(str);
    console.log("output: " + str);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // take the submitted value and split the string into an array
    let guess = userGuess.split("");
    // check that the submitted value is valid
    if (isSubmissionValid(guess)) {
      // turn guess into array of ints
      for (let i = 0; i < guess.length; i++) {
        guess[i] = parseInt(guess[i]);
      }
      // Increment number of attempts
      setNumAttempts(numAttempts + 1);
      
      // compare against the winning combination checkAnswer()
      checkAnswer(guess);
    }
  }

  function checkAnswer(arr) {
    console.log("Your answer: " + arr);
    checkDigits(arr);
  }

  function checkDigits(arr, callback) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] == winningCombo[i]) { // Is the digit in the correct spot?
        setA(A => A + 1);
      }
      else if (winningCombo.includes(arr[i])) { // If not, is the digit in the winning combo at all?
        setB(B => B + 1);
      }
    }
  }

  function showResult() {
    if (A == 4) {
      console.log("Correct! You win! It took you " + numAttempts + " attempts.");
    } else {
      console.log("Your guess was wrong.");
      
      // resetHintState();
    }
  }

  function resetHintState() {
    setA(0);
    setB(0);
  }

  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />

      <form onSubmit={handleSubmit}>
        <RICIBs
          amount={4}
          autoFocus
          handleOutputString={handleUserInput}
          inputRegExp={/^[0-9]$/}
        />
        <input type="submit" value="Submit" />
      </form>
      
      {/* <button onClick={() => generateWinningCombo()}>generateWinningCombo</button> */}
    </div>
  );
}

export default App;