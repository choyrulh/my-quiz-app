import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PropTypes } from "prop-types";

const QuestionTimer = ({ timeout, onTimeout, mode }) => {
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    // Animate the progress bar
    const timer = setTimeout(onTimeout, timeout);

    return () => {
      clearTimeout(timer);
    };
  }, [timeout, onTimeout]);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (remainingTime <= 0) {
      onTimeout();
    }
  }, [remainingTime, onTimeout]);

  return (
    <motion.div
      initial={{ opacity: 0, width: "100%" }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={`relative mb-4 ${mode === "answered" ? "opacity-0" : ""}`}
    >
      <motion.div
        animate={{ width: `${(remainingTime / timeout) * 100}%` }}
        className={`absolute top-0 left-0 h-full bg-blue-200 rounded-md`}
      ></motion.div>
      <progress
        max={timeout}
        value={remainingTime}
        className={`w-full opacity-0  ${mode} `}
      />
    </motion.div>
  );
};

QuestionTimer.propTypes = {
  timeout: PropTypes.number.isRequired,
  onTimeout: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
};

export default QuestionTimer;
