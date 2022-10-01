import React, {useState} from 'react';
import GameOver from './../../components/GameOver'

/* MUI Card */
import Card from './../../components/Card'

const Game = () => {
  const styles = {
    container: `h-[100vh] flex flex.col justify-around items-center bg-[#424874] relative`,
    questionContainer: 'relative',
    counter:'absolute top-[-20px] text-[20px] text-rose-400'
  }

  const [gameOver, setGameOver] = useState(false);
  const [points, setPoints] = useState(0);
  

  return (
    <div className={styles.container}>
      
      <div className={styles.questionContainer}> 
        { !gameOver ? 
          <Card setGameOver={setGameOver} points={points} setPoints={setPoints} />   :
          <GameOver points={points}/> 
        }
      </div>


    </div>
  )
}

export default Game