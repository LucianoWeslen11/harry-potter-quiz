/* eslint-disable */
import React from 'react';

import QuizLogo from '../src/components/QuizLogo';
import QuizBackground from '../src/components/QuizBackground';
import QuizContainer from '../src/components/QuizContainer';
import Widget from '../src/components/Widget';
import AlternativesForm from '../src/components/AlternativesForm';
import Button from '../src/components/Button';
import ContentLoader from "react-content-loader";

import db from '../db.json';

export const Loader = (props) => (
  <Widget>
    <Widget.Header />
    <ContentLoader
      speed={2}
      width={400}
      height={360}
      viewBox="0 0 400 360"
      backgroundColor="rgba(32, 117, 207, 0.4)"
      foregroundColor="rgba(207,180,33, 0.4)"
      {...props}
    >
      <rect x="20" y="30" rx="0" ry="0" width="308" height="39" />
      <rect x="20" y="90" rx="0" ry="0" width="167" height="13" />
      <rect x="40" y="120" rx="0" ry="0" width="269" height="44" />
      <rect x="40" y="170" rx="0" ry="0" width="268" height="42" />
      <rect x="40" y="220" rx="0" ry="0" width="268" height="42" />
      <rect x="40" y="270" rx="0" ry="0" width="267" height="44" />
    </ContentLoader>
  </Widget>
);

export const ResultWidget = ({results}) => (
  <Widget>
    <Widget.Header >
      Resultado
    </Widget.Header>
    <Widget.Content>
      <p>
        Você acertou
        {' '}
        {
          results.reduce(
            (accumulator, currentResult) => {
              return currentResult === true ? accumulator + 1 : accumulator;
            }, 0
          )
        }
        {' '}
        perguntas
      </p>
      <ul>
        {
          results.map(
            (result, index) => (
              <li key={`result_${index}`}>
                #
                {index + 1}
                {' '}
                Resultado: 
                {
                  result 
                  ? " Acertou!" 
                  : " Errou!"
                }
              </li>
            )
          )
        }
      </ul>
    </Widget.Content>
  </Widget>
);

function QuestionWidget({ 
  question, 
  questionIndex, 
  totalQuestion, 
  onSubmit,
  addResult
}) {
  const [selectedAlternative, setSelectedAlternative] = React.useState(undefined)
  const [isQuestionSubmited, setIsQuestionSubmited] = React.useState(false)
  const questionId = `question_${questionIndex}`;
  const isCorrect = selectedAlternative === question.answer
  const hasAlternativeSelected = selectedAlternative !== undefined;
  
  return (
    <Widget>
      <Widget.Header>
        <h3>
          {`Pergunta ${questionIndex+1} de ${totalQuestion}`}
        </h3>
      </Widget.Header>
      <img
        alt="description"
        style={{
          width: '100%',
          height: '150px',
          objectFit: 'cover',
        }}
        src={question.image}
        />
      <Widget.Content>
        <h2>{question.title}</h2>
        <p>{question.description}</p>
        <AlternativesForm
          onSubmit={(event) => {
            event.preventDefault();
            setIsQuestionSubmited(true);

            setTimeout(() => {
              addResult(isCorrect);
              onSubmit();
              setSelectedAlternative(undefined)
              setIsQuestionSubmited(false);
            }, 3 * 1000)
          }}
          >
          {
            question.alternatives.map((alternative, index) => {
              const alternativeId = `alternative_${index}`;
              const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR';
              const isSelected = selectedAlternative === index;

              return (
                <Widget.Topic
                  as="label"
                  htmlFor={alternativeId}
                  data-selected={isSelected}
                  data-status={isQuestionSubmited && alternativeStatus}
                >
                  <input
                    style={{ display: 'none' }}
                    id={alternativeId}
                    type="radio"
                    name={questionId}
                    onChange={() => {setSelectedAlternative(index)}}
                  />
                  {alternative}
                </Widget.Topic>
              )
            })
          }
          <Button 
            disabled={!hasAlternativeSelected} 
            type="submit"
          >
            Confirmar
          </Button>         
        </AlternativesForm>
      </Widget.Content>
    </Widget>
  );
}

const screenStates = {
  QUIZ: 'QUIZ',
  LOADING: 'LOADING',
  RESULT: 'RESULT',
}

export default function QuizPage() {
  const [screenState, setScreenState] = React.useState(screenStates.LOADING);
  
  const [results, setResults] = React.useState([]);

  const totalQuestions= db.questions.length;
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const questionIndex = currentQuestion;
  const question = db.questions[questionIndex];

  function addResult(result){
    setResults([
      ...results,
      result
    ])
  }

  React.useEffect(() => {
    setTimeout(() => {
      setScreenState(screenStates.QUIZ);
    }, 1 * 1000);
  }, []);
  
  function handleSubmitQuiz() {
    const nextQuestion = questionIndex + 1;
    if (nextQuestion < totalQuestions) {
      setCurrentQuestion(nextQuestion);
    } else {
      setScreenState(screenStates.RESULT);
    }
  }

  return (
    <QuizBackground backgroundImage={db.bg}>
      <QuizContainer>
        <QuizLogo />
        {
          screenState === screenStates.QUIZ && (
            <QuestionWidget 
              question={question}
              questionIndex={questionIndex}
              totalQuestion={totalQuestions}
              onSubmit={handleSubmitQuiz}
              addResult={addResult}
            />
          )
        }

        {screenState === screenStates.LOADING && <Loader />}

        {screenState === screenStates.RESULT && <ResultWidget results={results}/>}
      </QuizContainer>
    </QuizBackground>
  );
}
