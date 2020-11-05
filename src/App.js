import React, { useState, useEffect } from 'react'
import FlashcardList from './components/FlashcardList';
import './App.css';
import axios from 'axios';
const SAMPLE_FLASH = [
  {
    id: 1,
    question: 'Question 1?',
    answer: 'Answer',
    options: [
      '2',
      '4',
      '5'
    ]
  },
  {
    id: 2,
    question: 'Question 2?',
    answer: 'Answer',
    options: [
      '2',
      '4',
      '5'
    ]
  }
]
function App() {

  const [flashcards, setFlashcards] = useState(SAMPLE_FLASH);

    useEffect(() => {
      axios
      .get('https://opentdb.com/api.php?amount=10')
      .then(res => {
        setFlashcards(res.data.results.map((questionItem, index) => {
          const answer = decodeString(questionItem.correct_answer)
          const options = [
            ...questionItem.incorrect_answers.map(a => decodeString(a)), 
            answer]
          return {
            id:`${index}-${Date.now()}`,
            question: decodeString(questionItem.question),
            answer: questionItem.correct_answer,
            options: options.sort(() => Math.random() - .5)
          }
        }))
      })
    }, [])
 
    function decodeString(str) {
      const textArea = document.createElement('textarea')
      textArea.innerHTML= str
      return textArea.value
    }
  return (
    <div className="container">
      <FlashcardList flashcards={flashcards}/>
    
    </div>
  );
}

export default App;
