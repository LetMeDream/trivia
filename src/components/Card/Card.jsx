import React, {useEffect, useState, useRef} from 'react';
import cardModule from './Card.module.css'
/* Pictures */
import art from './../Assets/arte.webp';
import nature from './../Assets/nature.webp';
import culture from './../Assets/culture.jpg';
import sport from './../Assets/sport.jpg';
import trip from './../Assets/trip.jpg';

/* MUI Card */
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
/* To redirect after defeat */
import { useNavigate } from "react-router-dom";
/* Audios */
import {Howl} from 'howler';
import nice from './../Assets/goodAns.mp3'
import wrongo from './../Assets/badAns.mp3'
import defeat from './../Assets/defeat.mp3'
import clock from './../Assets/tictac.mp3'

/* For some magic reason, for react-howler to be able to stop/pause a sound, the Howl
object must be instanciated 'globally' (outside our functional component)
*/
const ticking = new Howl({
    src:clock,
    html5:true,
    loop:true
});

export default function MediaCard({type,options,answer,currentQuestion,lives,points,setLives,setPoints,
    question,setQuestion,questions,setQuestions}) {
    const navigate = useNavigate();
    const [degradeProtection, setDegradeProtection] = useState(true);
    /* Just a boolean to stop the counter from handleClick() */
    const [counting, setCounting] = useState(true);

    /* Sounds, (not globally) */
    const playSound = (src,msg,loop) => {
        const sound = new Howl({
            src,
            html5:true,
            loop:loop
        });
        return sound
        /* if(msg){
            sound.on('end',function(){
                alert(msg)
            })
        } */
    }
    const wrongAns = playSound(wrongo);
    const goodAns = playSound(nice);
    const gameOver = playSound(defeat);

    /* Ticking */
    useEffect(()=>{
        ticking.play()
        return () => {
            ticking.stop();
        }
    },[])

    /* Time */  
    const [time, setTime] = useState(10);
    /* Helper function. It does what it says. */
    const capitalizeFirstLetter=(text)=>{
        text = text.charAt(0).toUpperCase() + text.slice(1)
        return text
    } 
    /* I needed to create a ref for every button (3) 
    but thanks to a wise man advise, what I'll do it just create a ref for those 3 buttons parents */
    const parentRef = useRef(null)
    const handleClick = async (option,e) => {
        /* Let's block clicks for a while */
        parentRef.current.style.pointerEvents = 'none'
        /* wrong answer? */
        if(option.toLowerCase()!==answer.toLowerCase()){
            e.target.classList.add(cardModule.wrongo);
            for (const child of parentRef.current.children) {
                if(child.textContent.toLowerCase() === answer.toLowerCase()){
                    child.classList.add(cardModule.correct)
                }
            }
            wrongAns.play()
            setLives(lives-1);
            /* Not taking point out while degradeProtection is truthy */
            !degradeProtection ? setPoints(points-10) : setPoints(points);
            /* Here we compare to '1' instead of '0' because lives will only have the value of 0 after the next render */
            if(lives===1||(points<=0&&!degradeProtection)){
                setCounting(false);
                ticking.stop();
                gameOver.play();
                await new Promise((resolve)=>{
                    setTimeout(() => {
                        alert("You've lost");
                        return navigate(`/`);
                        /* You might be wondering why I'm awaiting on this unnecessary promise. This promise, altho unncessary, does what it
                        attempts to */
                        /* It's intention is to make the whole code actually stop until it can resolve, so the code stating:
                        "parentRef.current.style.pointerEvents = 'auto'" inside of the setTimeout some lines below won't crash
                        when it doesn't find a 'parentRef' (since we will be already redirected to <Main/> component ( Path='/' )

                        Don't believe me? || or want more info about it?; check this short:
                        https://www.youtube.com/shorts/7IRH290OqqQ
                        */
                    }, "4500");
                }) 
            }
            setDegradeProtection(false);
        }
        else{
            /* You ain't protected anymore */
            setDegradeProtection(false)
            goodAns.play()
            e.target.classList.add(cardModule.correct);
            setPoints(points+10);
        }
        /* Remove all button styling, enable events and change question */
        await new Promise((resolve)=>{
            setTimeout(() => {
                for (const child of parentRef.current.children) {
                        child.classList.remove(cardModule.correct)
                        child.classList.remove(cardModule.wrongo)
                }
                parentRef.current.style.pointerEvents = 'auto'
                setQuestion(questions[Math.floor(Math.random()*(questions.length))]);
                resolve()
            }, "1000")

        })
        /* set counter back to 10 */
        setTime(10);

          
    }
    
    /* Let's count down */
    useEffect(()=>{
        let intervalId = setInterval( async() => {
            if(time>0){
                setTime(time-1)
            }else{
                parentRef.current.style.pointerEvents = 'none';
                ticking.stop();
                gameOver.play();
                clearInterval(intervalId);
                await new Promise((resolve)=>{
                    setTimeout(() => {
                        alert("You've lost");
                        return navigate(`/`);
                    }, "4500");
                })
            }
    
        }, 1000);
        // To stop the counter as soon as you lose 
        if(!counting){
            clearInterval(intervalId);
        }

        return () => {
            clearInterval(intervalId);
        }
    // eslint-disable-next-line
    },[time,counting])
    
    /* This is just the image changing logic */
    const [img, setImg] = useState()
    useEffect(()=>{
        switch (type) {
            case 'arte':
                setImg(art)
                break;
            case 'naturaleza':
                setImg(nature)
                break;
            case 'deportes':
                setImg(sport)
                break;
            case 'cultura':
                setImg(culture)
                break;
            case 'viajes':
                setImg(trip)
                break; 
            default:
                break;
        }
    },[type])

    const styles = {
        container: `relative`,
        counter: 'text-[2rem] text-rose-500 absolute top-[-3rem]'
    }

  return (
    <div className={styles.container}>
        <div className={styles.counter}>{time}</div>
        <Card sx={{ maxWidth: 360 }}>
            <CardMedia
                sx={{height:'180px'}} 
                component="img"
                image={img}
                alt="green iguana"
            />
            <CardContent>
                <div style={{ display:'flex', justifyContent:'space-around' }}>
                    <div style={{ display:'flex', alignItems:'center', marginBottom:'0.35rem' }}>{points}</div>
                    <Typography gutterBottom variant="h5" component="div" sx={{ textAlign:'center' }}>
                    Tema: {type ? capitalizeFirstLetter(type) : ''}
                    </Typography>
                    <div style={{ display:'flex', alignItems:'center', marginBottom:'0.35rem' }}>
                        <Badge badgeContent={lives} color="primary" showZero>
                            <FavoriteBorderIcon color="action" />
                        </Badge>
                    </div>
                </div>
                <Typography variant="body2" color="text.secondary" sx={{textAlign:'center'}}>
                {currentQuestion}
                </Typography>
            </CardContent>
            <CardActions disableSpacing={true} sx={{flexDirection:'column',gap:'2px',alignItems:'center'}}>
                <div className={cardModule.buttonsContainer} ref={parentRef}>
                    { 
                        options.map((option,i) => {
                        return (
                                <Button 
                                    key={i}
                                    onClick={(e)=>{handleClick(option,e)}}
                                    sx={{width:'80%'}}
                                    size="small" variant='outlined'>{option}
                                </Button>
                                )
                        }) 
                    }
                </div>
                
            </CardActions>
        </Card>
    </div>

  );
}
