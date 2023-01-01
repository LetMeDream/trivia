import React from 'react'
import cssModule from './MainButton.module.css'
/* MUI */
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
/* react-router-dom */
import {Link} from 'react-router-dom'
import Instructions from '../Instructions/Instructions';

const MainButton = () => {
  return (
    <>
        {/* buttons for small */}
        <div className='md:hidden'>
            <Box 
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '& > *': {
                    m: 10,
                    }
                }}
            >
            <ButtonGroup className={cssModule.btnGroup} variant="contained" orientation="vertical" color='secondary' aria-label="outlined button group"
                sx={{ 
                '& > * > *':{
                    marginTop: '10px !important',
                    backgroundColor: '#F4EEFF !important', 
                    borderColor:'#F4EEFF !important', 
                    color:'#424874 !important',
                    width:'100%'
                },
                '& > * > *:hover':{
                    backgroundColor: '#DCD6F7!important'
                }
                }}>
                <Link to='/'>
                    <Button>            
                        Instructions
                    </Button>
                </Link>
                <Link to='/game'>
                    <Button>
                        Play
                    </Button>
                </Link>
            </ButtonGroup>
            </Box>
        </div>
        {/* buttons for md and up */}
        <div className='hidden md:block'>
            <Box 
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    '& > *': {
                    m: 10,
                    }
                }}
            >
            <ButtonGroup className={cssModule.btnGroup} variant="contained" color='secondary' aria-label="outlined button group"
                sx={{ 
                gap:'10px',
                '& > * > *':{
                    backgroundColor: '#F4EEFF', 
                    borderColor:'#F4EEFF !important', color:'#424874 !important'
                },
                '& > * > *:hover':{
                    backgroundColor: '#DCD6F7'
                }
                }}>
                <Link to='/'>
                    <Button>            
                        <Instructions text='Instructions'/>
                    </Button>
                </Link>
                <Link to='/game'>
                    <Button>
                        Play
                    </Button>
                </Link>
            </ButtonGroup>
            </Box>
        </div>
    </>

  )
}

export default MainButton