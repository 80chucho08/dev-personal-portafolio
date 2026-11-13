import { motion, useReducedMotion } from "framer-motion";

/* Subrayado de marcatextos que se "pinta" al entrar en pantalla. */
export const Highlight = ({ children, delay = 0.2 }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      className="marker"
      initial={reduceMotion ? false : { backgroundSize: "0% 100%" }}
      whileInView={{ backgroundSize: "100% 100%" }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1], delay }}
    >
      {children}
    </motion.span>
  );
};
