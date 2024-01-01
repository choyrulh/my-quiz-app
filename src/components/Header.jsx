import logo from "../assets/logo-kuis.png";
import { motion } from "framer-motion";
const Header = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className=" mx-auto max-w-max p-2 my-3 bg-transparent rounded-md shadow-md shadow-green-500 flex flex-col items-center"
    >
      {/* width and height div follow the width of the img content and motion h1*/}
      <div className="  flex flex-col items-center min-h-min min-w-min rounded-lg">
        <img src={logo} alt="logo" className="h-8 w-8 mr-2" />
        <motion.h1
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-bold"
        >
          React Quiz
        </motion.h1>
      </div>
    </motion.header>
  );
};

export default Header;
