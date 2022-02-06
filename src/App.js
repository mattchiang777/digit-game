// P0 - Clear input boxes on submit
// P1 - Input boxes should automatically prevent repeat digits
// TODO: Show the clues and # of attempts
import React, { useState, useEffect } from 'react';
import RICIBs from 'react-individual-character-input-boxes';
import logo from './jack.png';
import './App.css';
import { generateWinningCombo, isSubmissionValid } from './utilities';

const winningCombo = generateWinningCombo();
console.log("The winning combo is " + winningCombo);

function App() {

  const [A, setA] = useState();
  const [B, setB] = useState();
  const [numAttempts, setNumAttempts] = useState(0);
  const [userGuess, setUserGuess] = useState("");
  const [guessList, setGuessList] = useState([]);
  const [clueList, setClueList] = useState([]);

  useEffect(() => {
    if (A == undefined || B == undefined) { return; }
    showResult();
    console.log("Your clues: " + A + "A" + " " + B + "B");
    let clue = [A, B];
    setClueList(clueList => [clue, ...clueList]);
    // resetHintState(); // useState only fires if the the value you are updating the state with is different to the previous one 
  }, [A, B]);

  const handleUserInput = (str) => {
    setUserGuess(str);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    
    // take the submitted value and split the string into an array
    let guess = userGuess.split("");
    // check that the submitted value is valid
    if (isSubmissionValid(guess)) {
      resetHintState();
      // Record the guess
      setGuessList(guessList => [guess, ...guessList]);

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
      return;
    } else {
      console.log("Your guess was wrong.");
    }
  }

  function resetHintState() {
    setA(0);
    setB(0);
  }

  const renderGuessList = (guessList) => guessList.reverse().map((guess) => // TODO: reverses the same array so the list will flip
    (
      <li>{guess}</li>
    )
  );

  const renderCluelist = (clueList) => clueList.reverse().map((clue) =>
    (
      <li>{clue[0] + "A " + clue[1] + "B"}</li>
    )
  );



  return (
    <div className="text-center w-screen h-screen flex flex-col items-center justify-center bg-gray">
      <img src={logo} className="App-logo mb-20" alt="logo" />

      <form onSubmit={handleSubmit}>
        <RICIBs
          amount={4}
          autoFocus
          handleOutputString={handleUserInput}
          inputProps={[
            { className: "bg-white border border-slate-300" },
            { className: "bg-white border border-slate-300" },
            { className: "bg-white border border-slate-300" },
            { className: "bg-white border border-slate-300" },
          ]}
          inputRegExp={/^[0-9]$/}
        />
        <input className="mt-8 px-8 py-2 text-white bg-sky-600 hover:bg-sky-700 active:bg-sky-600 rounded-full" type="submit" value="Submit" />
        
        <p>Number of attempts: {numAttempts}</p>
        <div className='flex flex-row justify-center'>
          <ul className='p-6'>
            {renderGuessList(guessList)}
          </ul>
          <ul className='p-6'>
            {renderCluelist(clueList)}
          </ul>
        </div>
      </form>
      
    </div>
  );
}

export default App;