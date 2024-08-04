import React, {useEffect, useState} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

/* Using overcomplicated MUI media queries */
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function InsetList({score, setNewTopScore}) {
    const [highScores, setHighScores] = useState( JSON.parse(localStorage.getItem('highScores')) || []);

    function sortArrayOfObject(a,b){
      return b.score-a.score
    }

    useEffect(()=>{
        const previousScores = JSON.parse(localStorage.getItem('highScores'));

        let date = new Date();
        let day = date.getDate(), month = date.getMonth()+1, year = date.getFullYear().toString().slice(2);
        let formattedDate = day + '/' + month + '/' + year;

        /* if new highscore */
        if(!highScores.some(oldScore => oldScore.score === score) && (score > highScores[2]?.score || highScores.length < 3)){
          console.log('new highscore scored');
          setNewTopScore(true);
        }
        if(previousScores){
            /* We won't include the 'highScore' if it was already scored before */
            if(highScores.some(oldScore => oldScore.score === score)){
              console.log('Highscore already "scored"');
              return;
            }
            setHighScores(highScores => [...previousScores,{
                date:formattedDate,
                score:score
            }]);
        }else{
            setHighScores(highScores => [...highScores,{
                date:formattedDate,
                score:score
            }])
        }
    // eslint-disable-next-line
    },[]);

    useEffect(()=>{
        console.log(highScores);
        localStorage.setItem('highScores', JSON.stringify(highScores));
    },[highScores])

    /* Overcomplicated MUI media query logic */
    const theme = useTheme()
    const small = useMediaQuery(theme.breakpoints.down('sm'));
    /* console.log(small) */

  return (
    <TableContainer className='md:max-w-[60%]' component={Paper}>
      <Table sx={{ minWidth: '90%' }} aria-label="simple table">
        <TableHead>
          <TableRow>
              <TableCell colSpan={3} align='center'>
                Top 3 highscores
              </TableCell>
          </TableRow>
          <TableRow>
            <TableCell sx={{ maxWidth:'max-content !important' }}>#</TableCell>
            <TableCell align={small ? 'right' : 'center'}>
             {!small ? 
              <>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;
              </> : ''}
              Date
              {small ? <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</> : ''}
            </TableCell>
            <TableCell sx={{ maxWidth:'max-content !important' }} align='right'>Points</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

          {highScores.sort(sortArrayOfObject).map((score,i) => (
            i <= 2 ? (
              <TableRow
              key={i}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{ maxWidth:'max-content !important' }} component="th" scope="row">
                  <strong>{i+1}</strong> 
                </TableCell>
                <TableCell align={small ? 'right' : 'center'}>
                  {!small ? 
                  <>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </> : ''}
                  {score.date}
                  {small ? <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</> : ''}
                </TableCell>
                <TableCell sx={{ maxWidth:'max-content !important' }} align='right'>{score.score}</TableCell>
             </TableRow>
            ) : ''
            
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
