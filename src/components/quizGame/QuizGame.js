import Quiz from "../quiz/Quiz";
import React from 'react';
import { useState } from 'react';


function QuizGame(){

    const [isGameOn, setIsGameOn] = useState(false);

    function handleStartGame() {

        setIsGameOn(true)
        
    }
    
    return (
        <>
        {isGameOn ? (<Quiz/>) :(
        <div className='app'>
            
            <div className='question-count'>
                <span>Quiz Game </span>
                <button onClick={handleStartGame}>Start Quiz</button>
             </div>



        </div>)}
        </>
    );
}


export default QuizGame;