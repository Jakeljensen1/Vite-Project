import { useState } from 'react';
import './App.css'

function App({ maxAttack = 25 }) {
  const initialHealth = 100;
  const initialGameStatus = "active";

  const [gameStatus, setGameStatus] = useState(initialGameStatus);
  const [playerHealth, setPlayerHealth] = useState(initialHealth);
  const [enemyHealth, setEnemyHealth] = useState(initialHealth);

  function handleAttack() {
    const playerAttackDamage = Math.floor(Math.random() * maxAttack + 1);
    const enemyAttackDamage = Math.floor(Math.random() * maxAttack + 1); //0-25 damage max
    //console.log(playerAttackDamage);
    //console.log(enemyAttackDamage);

    const updatedPlayerHealth = Math.max(playerHealth - enemyAttackDamage, 0);
    const updatedEnemyHealth = Math.max(enemyHealth - playerAttackDamage, 0);
    //console.log(updatedEnemyHealth);

    setPlayerHealth(updatedPlayerHealth);
    setEnemyHealth(updatedEnemyHealth);
    //console.log(updatedPlayerHealth);

    if (updatedPlayerHealth === 0 && updatedEnemyHealth === 0) {
      setGameStatus("draw");
      //console.log("you tie!")
    }
    else if (updatedEnemyHealth === 0) {
      setGameStatus("win");
      //console.log("you win!")
    }
    else if (updatedPlayerHealth === 0) {
      setGameStatus("lose");
      //console.log("you lose!")
    }
  }

  function handleRestart() {
    setPlayerHealth(initialHealth);
    setEnemyHealth(initialHealth);
    setGameStatus(initialGameStatus);
  }

  function renderGameStatusMessage() {
    switch (gameStatus) {
      case "win":
        return "Congratulations! 😎💪 You've successfully defended your spacecraft.";
      case "lose":
        return "Mission Failed. 😵️ Your spacecraft has been defeated.";
      case "draw":
        return "It's a draw! 🤝 Both spacecrafts have been neutralized.";
      default:
        return "Engage the enemy! ☄️";
    }
  }

  function renderHealth(health) {
    let emoji = "";

    if (health === 100) {
      emoji = "❤️";
    }

    else if (health === 0) {
      emoji = "💀";
    }

    else {
      emoji = "❤️‍🩹";
    }

    return `${health} ${emoji}`;
  }

  return (
    <div className={"main-container"}>
      <div className={"game-title"}>
        <h2>Space Battle Simulator</h2>
      </div>

      <div className={"game-container"}>
        <div className={"player"}>
          <p>Player Health: <span className={"score"}>{renderHealth(playerHealth)}</span></p>
        </div>

        {
          gameStatus === "active"
          &&
          <div className={'attack'}>
            <button onClick={handleAttack}>Fire!</button>
          </div>
        }

        {
          gameStatus !== "active"
          &&
          <div className={'gameOver'}>
            <button onClick={handleRestart}>Restart!</button>
          </div>
        }

        <div className={"enemy"}>
          <p>Enemy Health: <span>{renderHealth(enemyHealth)}</span></p>
        </div>

        <div className={"message-container"}>
          <p>{renderGameStatusMessage()}</p>
        </div>


      </div>
    </div>
  )
}

export default App
