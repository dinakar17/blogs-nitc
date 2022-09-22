import React from "react";
import { motion } from "framer-motion";

const index = () => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <motion.span
        className="cursor-pointer"
        variants={variants}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
      >
        Drop Down
      </motion.span>
    </div>
  );
};

export default index;
