import React, { useState, useEffect } from 'react';
import './App.css'; // 
import FixedSlider from './fixedslider'; // 
const questions = [
  {
    id: 1,
    question: 'I have ambitious aims of making a difference.',
    trait: 'idealistic',
  },
  {
    id: 2,
    question: 'My leadership journey has progressed as I anticipated.',
    trait: 'idealistic',
  },
  {
    id: 3,
    question: 'I have spent fewer than 4 years in full-time service or ministry.',
    trait: 'idealistic',
  },
  {
    id: 4,
    question: 'With hard work and determination, I have been able to persevere through the ministry challenges that have come my way.',
    trait: 'idealistic',
  },
  {
    id: 5,
    question: 'Test question for idealistic trait.',
    trait: 'idealistic',
  }
];

const Assess = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [traitScores, setTraitScores] = useState({ idealistic: 0, disillusioned: 0, cynical: 0, hopeful: 0 });
  const [answers, setAnswers] = useState(new Array(questions.length).fill(null)); // Initially all questions are unanswered
  const [answeredCount, setAnsweredCount] = useState(0); // Count of answered questions
  const [selectedOption, setSelectedOption] = useState(null); // Track the selected option for display

  const currentQuestion = questions[currentQuestionIndex];

  const handleSliderChangeAndAnswer = (newValue) => {
    // Display the selected option for 2 seconds
    setSelectedOption(newValue);
    setTimeout(() => {
      setSelectedOption(null);
      // Update the answer for the current question
      const updatedAnswers = [...answers];
      updatedAnswers[currentQuestionIndex] = newValue;
      setAnswers(updatedAnswers);
      // Increment the trait score
      const updatedTraitScores = { ...traitScores };
      updatedTraitScores[currentQuestion.trait] = Math.min(updatedTraitScores[currentQuestion.trait] + 1, 5);
      setTraitScores(updatedTraitScores);
      // Update answered count
      setAnsweredCount(answeredCount + 1);
      // Move to the next question automatically
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      }
    }, 1000); // Delay 1 seconds
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      const prevQuestionIndex = currentQuestionIndex - 1;
      const prevQuestion = questions[prevQuestionIndex];
      const prevAnswer = answers[prevQuestionIndex];
      // Decrement the trait score if the previous question was answered
      if (prevAnswer !== null) {
        const updatedTraitScores = { ...traitScores };
        updatedTraitScores[prevQuestion.trait] = Math.max(updatedTraitScores[prevQuestion.trait] - 1, 0);
        setTraitScores(updatedTraitScores);
      }
      // Update the current question index
      setCurrentQuestionIndex(prevQuestionIndex);
    } else if (currentQuestionIndex === 0) {
      // Recalculate trait scores based on answered questions
      let tempTraitScores = { idealistic: 0, disillusioned: 0, cynical: 0, hopeful: 0 };
      answers.forEach((answer, index) => {
        if (answer !== null) {
          const trait = questions[index].trait;
          tempTraitScores[trait] = Math.min(tempTraitScores[trait] + 1, 5);
        }
      });
      setTraitScores(tempTraitScores);
      setCurrentQuestionIndex(0); // Ensure the index is explicitly set to 0
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      // Increment the trait score
      const updatedTraitScores = { ...traitScores };
      updatedTraitScores[currentQuestion.trait] = Math.min(updatedTraitScores[currentQuestion.trait] + 1, 5);
      setTraitScores(updatedTraitScores);
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  return (
    <div className="Assess">
      <div className="trait-sliders">
        <div className="trait-slider">
          <p>IDEALISTIC</p>
          <div className="slider-track">
            <div className="slider-fill" style={{ width: `${(traitScores.idealistic / 5) * 100}%` }}></div>
          </div>
        </div>
        <div className="trait-slider">
          <p>DISILLUSIONED</p>
          <div className="slider-track">
            <div className="slider-fill" style={{ width: `${(traitScores.disillusioned / 5) * 100}%` }}></div>
          </div>
        </div>
        <div className="trait-slider">
          <p>CYNICAL</p>
          <div className="slider-track">
            <div className="slider-fill" style={{ width: `${(traitScores.cynical / 5) * 100}%` }}></div>
          </div>
        </div>
        <div className="trait-slider">
          <p>HOPEFUL</p>
          <div className="slider-track">
            <div className="slider-fill" style={{ width: `${(traitScores.hopeful / 5) * 100}%` }}></div>
          </div>
        </div>
      </div>

      

      {/* Current question */}
      <div className="question">
        <h3>Question {currentQuestion.id}</h3>
        <p>{currentQuestion.question}</p>
        {/* FixedSlider for answer */}
        <FixedSlider value={answers[currentQuestionIndex]} onChange={handleSliderChangeAndAnswer} />
      </div>

      {/* Navigation buttons */}
      <div className="navigation-buttons">
        <button onClick={handlePrev} disabled={currentQuestionIndex === 0}>
          Prev
        </button>
        <button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1 || answers[currentQuestionIndex] === null}>
          {answeredCount === 5 && currentQuestionIndex === questions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default Assess;
