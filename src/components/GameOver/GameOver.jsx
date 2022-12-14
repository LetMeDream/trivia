import React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import HighScoresTable from '../HighScoresTable';
import {Link} from 'react-router-dom';
import { IoIosArrowBack } from "react-icons/io";
import { IconContext } from "react-icons";
import { useEffect, useState } from 'react';
/* Toast */
import Snackbar from './../Snackbar'

const GameOver = ({points}) => {

    const style={
        container: `h-[100vh] w-[90vw] flex flex-col justify-around items-center bg-[#424874] py-10`,
        score: `flex flex-col p-4 items-center`,
        backArrow: `absolute left-4 top-10 cursor-pointer`,
        snackBar: `absolute`
    }

    const [newTopScore, setNewTopScore] = useState(false);

    useEffect(()=>{
      console.log('a new score have been set ' + newTopScore)
    },[newTopScore])

  return (
    <Box className={style.container}>
        <IconContext.Provider value={{ size:'30px', color:'white',className: "backIcon" }}>
          <Link to='/' className={style.backArrow}>
            <IoIosArrowBack/>
          </Link>
        </IconContext.Provider>

        <Paper elevation={15} className={style.score + ''}>
            <h2 className='text-rose-700 text-xl'>GameOver</h2>
            <Divider flexItem={true}/>
            <p>You scored <strong>{points}</strong> points</p>
        </Paper>
        <HighScoresTable setNewTopScore={setNewTopScore} score={points} />

        <div className={style.snackBar}>
          <Snackbar points={points} newTopScore={newTopScore} />
        </div>
    </Box>
  )
}

export default GameOver