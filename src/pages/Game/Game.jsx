import React,{useState,useEffect} from 'react';
import {Preguntas} from './../../components/Helpers/BD.jsx'
/* MUI Card */
import Card from './../../components/Card'

const Game = () => {
  const [lives, setLives] = useState(5);
  const [points, setPoints] = useState(0);
  const [questions, setQuestions] = useState(Preguntas);


  const [question, setQuestion] = useState(questions[Math.floor(Math.random()*(questions.length))]);

 
  

  useEffect(()=>{
    /* Taking current question out of questions */
    setQuestions(questions.filter((q)=>q.id!==question.id) ); 
    console.log(question)
    console.log(questions);
    // eslint-disable-next-line
  },[question])
  
  const styles = {
    container: `h-[100vh] flex flex.col justify-around items-center bg-[#424874] relative`,
    questionContainer: 'p-2 relative',
    counter:'absolute top-[-20px] text-[20px] text-rose-400'
  }

  return (
    <div className={styles.container}>
      
      <div className={styles.questionContainer}>
        { (question!==undefined) && 
        <Card 
              question={question} setQuestion={setQuestion} questions={questions}
              lives={lives} points={points} setLives={setLives} setPoints={setPoints}
              type={question.estilos} currentQuestion={question.pregunta}
              options={[question.respuesta1, question.respuesta2, question.respuesta3]}
              answer={question.solucion}
        ></Card>
        }
      </div>


    </div>
  )
}

export default Game