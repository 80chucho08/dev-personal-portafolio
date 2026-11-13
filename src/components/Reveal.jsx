import { motion, useReducedMotion } from "framer-motion";

const elements = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
};

export const Reveal = ({ as = "div", children, className = "", ...props }) => {
  const reduceMotion = useReducedMotion();
  const Element = elements[as] ?? motion.div;

  return (
    <Element
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      {...props}
    >
      {children}
    </Element>
  );
};
