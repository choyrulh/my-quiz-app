import { useRef } from "react";
import { motion } from "framer-motion";
import { PropTypes } from "prop-types";

const Answers = ({ answers, selectedAnswer, answerState, onSelect }) => {
  const shuffledAnswers = useRef();

  if (!shuffledAnswers.current) {
    shuffledAnswers.current = [...answers];
    shuffledAnswers.current.sort(() => Math.random() - 0.5);
  }

  return (
    <motion.ul
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-4"
    >
      {shuffledAnswers.current.map((answer) => {
        const isSelected = selectedAnswer === answer;
        const isAnswered = answerState === "answered";
        const isCorrect = answerState === "correct";
        const isWrong = answerState === "wrong";

        const buttonStyles = `bg-blue-200 text-blue-800 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300`;

        return (
          <motion.li
            key={answer}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-2"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(answer)}
              className={`${
                isAnswered ? "cursor-not-allowed" : "cursor-pointer"
              } ${isSelected && isAnswered && "bg-blue-300"} ${
                isCorrect && isSelected && "bg-green-500"
              } ${isWrong && isSelected && "bg-red-500"} ${buttonStyles}`}
              disabled={isAnswered}
            >
              {answer}
            </motion.button>
          </motion.li>
        );
      })}
    </motion.ul>
  );
};

export default Answers;

Answers.propTypes = {
  answers: PropTypes.array.isRequired,
  selectedAnswer: PropTypes.string.isRequired,
  answerState: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};
