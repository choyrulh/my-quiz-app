import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import QUESTIONS from "../question.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

const Quiz = () => {
  const [userAnswers, setUserAnswers] = useState([]);
  const [startQuiz, setStartQuiz] = useState(false);

  const activeQuestionIndex = userAnswers.length;
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;

  const handleSelectAnswer = useCallback((selectedAnswer) => {
    setUserAnswers((prevUserAnswers) => [...prevUserAnswers, selectedAnswer]);
  }, []);

  const handleSkipAnswer = useCallback(
    () => handleSelectAnswer(null),
    [handleSelectAnswer]
  );

  const handleStartQuiz = useCallback(() => {
    setStartQuiz(true);
  }, []);

  const handleRetryQuiz = useCallback(() => {
    setUserAnswers([]); // Reset user answers
    setStartQuiz(false); // Reset quiz status
  }, []);

  if (quizIsComplete) {
    return (
      <Summary userAnswers={userAnswers} handleRetryQuiz={handleRetryQuiz} />
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      id="quiz"
      className="mx-auto max-w-max p-4 bg-transparent rounded-lg shadow-md shadow-green-500 flex flex-col items-center"
    >
      {startQuiz ? (
        <Question
          key={activeQuestionIndex}
          index={activeQuestionIndex}
          onSelectAnswer={handleSelectAnswer}
          onSkipAnswer={handleSkipAnswer}
        />
      ) : (
        <motion.button
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          onClick={handleStartQuiz}
          whileHover={{ scale: 1.1, transition: { duration: 0.5 } }}
          whileTap={{ scale: 0.5, transition: { duration: 0.3 } }}
          className="bg-gray-700 text-white px-4 py-2 rounded-md font-semibold hover:bg-gray-900"
        >
          Start Quiz
        </motion.button>
      )}
    </motion.div>
  );
};

export default Quiz;
