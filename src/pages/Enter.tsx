import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Enter = () => {
  const navigate = useNavigate();

  const handleEnter = () => {
    navigate("/home");
  };

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background z-50 overflow-y-auto cursor-pointer"
      onClick={handleEnter}
    >
      {/* Vertical scroll marquee */}
      <div className="min-h-[200vh] flex flex-col items-center justify-start pt-[20vh] pb-32">
        {/* Domain text - thin font */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: i * 0.05 }}
            className={`text-4xl md:text-6xl lg:text-8xl font-thin tracking-tighter-custom mb-4 ${
              i % 3 === 0
                ? "text-foreground"
                : i % 3 === 1
                ? "text-foreground/30"
                : "text-foreground/10"
            }`}
          >
            sadderdays.world
          </motion.div>
        ))}

        {/* Center CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="fixed bottom-12 left-1/2 -translate-x-1/2 text-center"
        >
          <motion.p
            animate={{ opacity: [1, 0.4, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-sd-red text-xs tracking-widest-custom font-light"
          >
            push to enter
          </motion.p>
        </motion.div>

        {/* More text as you scroll */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={`bottom-${i}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 + i * 0.05 }}
            className={`text-4xl md:text-6xl lg:text-8xl font-thin tracking-tighter-custom mb-4 ${
              i % 3 === 0
                ? "text-foreground/10"
                : i % 3 === 1
                ? "text-foreground/30"
                : "text-foreground"
            }`}
          >
            sadderdays.world
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Enter;
