import React, {useEffect, useState, useRef} from 'react';
import cardModule from '../components/Card/Card.module.css'
/* To redirect after defeat */
/* import { useNavigate } from "react-router-dom"; */
/* Pictures */
import art from '../components/Assets/arte.webp'
import nature from '../components/Assets/nature.webp';
import culture from '../components/Assets/culture.jpg';
import sport from '../components/Assets/sport.jpg';
import trip from '../components/Assets/trip.jpg';
/* Audios */
import {Howl} from 'howler';
import clock from '../components/Assets/tictac.mp3'
import nice from '../components/Assets/goodAns.mp3'
import wrongo from '../components/Assets/badAns.mp3'
import defeat from '../components/Assets/defeat.mp3'
/* Questions JSON */
import {Preguntas} from '../components/Helpers/BD'

/* Sounds, (not globally) */
const playSound = (src,msg,loop) => {
	const sound = new Howl({
			src,
			// html5:true,
			loop:loop
	});
	return sound
	/* if(msg){
			sound.on('end',function(){
					alert(msg)
			})
	} */
}

/* For some magic reason, for react-howler to be able to stop/pause a sound, the Howl
object must be instanciated 'globally' (outside our functional component)
*/
const ticking = new Howl({
  src:clock,
  // html5:true,
  loop:true
});


const useCard = ({ setGameOver, setPoints, points }) => {
  const [lives, setLives] = useState(5);
  const [degradeProtection, setDegradeProtection] = useState(true);
  /* Just a boolean to stop the counter from handleClick() */
  const [counting, setCounting] = useState(false);
  /* For creating our options array, our type,
     correct answer and more 
  */
  const [questions, setQuestions] = useState(Preguntas);
  const [question, setQuestion] = useState(questions[Math.floor(Math.random()*(questions.length))]);
  const [answer,setAnswer] =  useState(question.solucion);
  const [options, setOptions] = useState([]); 
  const [type, setType] = useState('');

  useEffect(()=>{
      /* Taking current question out of questions */
      setQuestions(questions => questions.filter((q)=>q.id!==question.id) ); 
      /* console.log(question)
      console.log(questions); */
      setAnswer(question.solucion);
      setType(question.estilos);
      setOptions([question.respuesta1,question.respuesta2,question.respuesta3]);
  },[question])

  const wrongAns = playSound(wrongo);
  const goodAns = playSound(nice);
  const gameOver = playSound(defeat);

  /* Ticking */
  useEffect(()=>{
      // ticking.play()
      return () => {
          /* To stop ticking sound on unmounting (whencgoing back)
          in our History.navigation */
          ticking.stop();
      }
  },[])

  /* Time */  
  const [time, setTime] = useState(15);
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
        !degradeProtection ? setPoints(points-5) : setPoints(points);
        /* Here we compare to '1' instead of '0' because lives will only have the value of 0 after the next render */
        if(lives===1||(points<=0&&!degradeProtection)){
            setCounting(false);
            ticking.stop();
            gameOver.play();
            await new Promise((resolve)=>{
                setTimeout(() => {
                    alert("You've lost");
                    setGameOver(true);
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
    /* set counter back to 15 */
    setTime(15);

    /* Remove all button styling, enable events and change question */
    await new Promise((resolve)=>{
        setTimeout(() => {
            for (const child of parentRef.current.children) {
                    child.classList.remove(cardModule.correct)
                    child.classList.remove(cardModule.wrongo)
            }
            parentRef.current.style.pointerEvents = 'auto'
            setQuestion(questions[Math.floor(Math.random()*(questions.length))]); 
        }, "1000")

    })



        
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
                    setGameOver(true);
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

  },[time,gameOver,setGameOver])
  
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

  const pause = () => {
    setCounting(false)
    ticking.pause()
  }

  const resume = () => {
    ticking.play()
    setCounting(true)
  }

  return {
    time,
    counting,
    pause,
    resume,
    parentRef,
    cardModule,
    options,
    question,
    img,
    handleClick,
    type,
    lives,
    capitalizeFirstLetter
  }
}

export default useCard