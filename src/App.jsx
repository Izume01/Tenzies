import { useState , useEffect} from "react";

import Dice from "./Dice.jsx";

export default function App() {
  const [dice, setDice] = useState(() => 
    new Array(10).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isLocked: false
    }))
  );

  const [win , setWin] = useState(false);

  function rollDice() {
    return dice.map((die) => {
      if(die.isLocked) {
        return die;
      }
      return {
        value: Math.ceil(Math.random() * 6),
        isLocked: false
      };
    });
  }

  function checkWin() {
    if(dice.every(die => die.isLocked && die.value === dice[0].value)) {
      setTimeout(() => {
      setWin(true);
      }, 2000);
    }
  }

  useEffect(()=> {
    checkWin();

  }, [dice]);


  function handleClick() {
    setDice(rollDice());
  }

  function lockDice(index) {
    const NewDice = [...dice];
    NewDice[index].isLocked = !NewDice[index].isLocked;
    setDice(NewDice);
  }

  const diceElement = dice.map((num, index) => (
    <Dice key={index} holding={num.isLocked} value={num.value} onLockDice={()=> lockDice(index)}></Dice>
  ));
  return (
    <>
      {!win && <div className="container">
        <div className="dice-container">{diceElement}</div>
        <button className="rollDiceBtn" onClick={handleClick}>Roll Dice</button>
      </div>}

      {win && <div className="container win-screen">
        <h1 className="win-title">🎉 Congratulations! 🎉</h1>
        <p className="win-text">You won the game!</p>
        <button 
          className="play-again-btn" 
          onClick={() => {
            setWin(false);
            setDice(rollDice());
          }}
        >
          Play Again
        </button>
      </div>}
    </>
  );
}
