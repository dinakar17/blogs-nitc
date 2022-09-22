import React from "react";
import { AnimatePresence, motion } from "framer-motion";

const index = () => {
  const [toggled, setToggled] = React.useState(false);
  const variants = {
    hidden: { scale: 0 },
    // staggerChildren means that the children will animate one after the other
    // "beforeChildren" to finish this transition before starting children transitions
    visible: {
      // opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren",
        duration: 0.3,
      },
      scale: 1,
    },
    collapsed: {
      scale: 0,
      transition: {
        duration: 0.1,
        when: "afterChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    collapsed: { opacity: 0, y: 10, transition: { duration: 0.2 } },
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="relative">
        <motion.span
          className="cursor-pointer"
          // variants are used to define the start and end states of an animation
          // initial is the initial state of the animation or the state of the animation when the component is first rendered
          initial={{ opacity: 0 }}
          // animate is the state of the animation when the component is rendered
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          whileHover={{ scale: 1.05 }}
          // animate y after scale animation is complete
          whileTap={{ scale: 0.9 }}
          onClick={() => setToggled((s) => !s)}
        >
          Drop Down
        </motion.span>
        <AnimatePresence>
          {toggled && (
            <motion.ul
              className="absolute bg-white shadow-lg rounded-lg p-2"
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="collapsed"
            >
              <motion.li variants={itemVariants} className="cursor-pointer">
                Item 1
              </motion.li>
              <motion.li variants={itemVariants} className="cursor-pointer">
                Item 2
              </motion.li>
              <motion.li variants={itemVariants} className="cursor-pointer">
                Item 3
              </motion.li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default index;
