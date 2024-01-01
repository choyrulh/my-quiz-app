import quizCompleteImg from "../assets/complete.png";
import { motion } from "framer-motion";
import { PropTypes } from "prop-types";
import QUESTIONS from "../question.js";

const Summary = ({ userAnswers, handleRetryQuiz }) => {
  const skippedAnswers = userAnswers.filter((answer) => answer === null);
  const correctAnswers = userAnswers.filter(
    (answer, index) => answer === QUESTIONS[index].answers[0]
  );

  const skippedAnswersShare = Math.round(
    (skippedAnswers.length / userAnswers.length) * 100
  );
  const correctAnswersShare = Math.round(
    (correctAnswers.length / userAnswers.length) * 100
  );
  const wrongAnswersShare = 100 - skippedAnswersShare - correctAnswersShare;

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center mt-8 max-w-2xl mx-auto bg-black rounded-lg p-6 border-spacing-8 shadow-lg"
    >
      <motion.img
        src={quizCompleteImg}
        alt="Trophy icon"
        className="w-32 h-32 mx-auto mb-4"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      />
      <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
      <div className="mb-4 flex flex-col gap-1">
        <div>
          <motion.p
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className=" text-blue-500"
          >
            {skippedAnswersShare}%
          </motion.p>
          <p className="text">skipped</p>
        </div>
        <div>
          <motion.p
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className=" text-green-500"
          >
            {correctAnswersShare}%
          </motion.p>
          <p className="text">answered correctly</p>
        </div>
        <div>
          <motion.p
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            className=" text-red-500"
          >
            {wrongAnswersShare}%
          </motion.p>
          <p className="text">answered incorrectly</p>
        </div>
      </div>
      <ol className="">
        <motion.button
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
          onClick={handleRetryQuiz}
          className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold mb-4"
        >
          Try Again
        </motion.button>
        {userAnswers.map((answer, index) => {
          const isSkipped = answer === null;
          const isCorrect = answer === QUESTIONS[index].answers[0];
          const isWrong = !isSkipped && !isCorrect;

          const listItemVariants = {
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5, delay: 0.1 * index },
          };

          return (
            <motion.li key={index} variants={listItemVariants} className="mb-4">
              <h3 className="text-xl font-bold">{index + 1}</h3>
              <p className="question text-lg font-semibold mb-1">
                {QUESTIONS[index].text}
              </p>
              <motion.p
                className={`${
                  isSkipped
                    ? "bg-yellow-300"
                    : isCorrect
                    ? "bg-green-500"
                    : isWrong
                    ? "bg-red-500"
                    : ""
                } text-black px-4 py-2 rounded-md`}
              >
                {answer ?? "Skipped"}
              </motion.p>
            </motion.li>
          );
        })}
      </ol>
    </motion.div>
  );
};

Summary.propTypes = {
  userAnswers: PropTypes.array.isRequired,
  handleRetryQuiz: PropTypes.func.isRequired,
};

export default Summary;
