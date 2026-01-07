import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState } from "react";
import yinYangImage from "@/assets/yin-yang-interactive.png";

const CoinFlipGame = () => {
  const [question, setQuestion] = useState("");
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState<"YES" | "NO" | null>(null);
  const [showResult, setShowResult] = useState(false);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const rotateX = useTransform(mouseY, [-100, 100], [15, -15]);
  const rotateY = useTransform(mouseX, [-100, 100], [-15, 15]);
  
  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isFlipping) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    if (isFlipping) return;
    mouseX.set(0);
    mouseY.set(0);
  };

  const flipCoin = () => {
    if (isFlipping) return;
    
    setIsFlipping(true);
    setShowResult(false);
    setResult(null);
    
    // Generate random result
    const answer = Math.random() > 0.5 ? "YES" : "NO";
    
    // Show result after flip animation
    setTimeout(() => {
      setResult(answer);
      setShowResult(true);
      setIsFlipping(false);
    }, 1500);
  };

  const reset = () => {
    setQuestion("");
    setResult(null);
    setShowResult(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full max-w-lg mx-auto"
    >
      {/* Question Input */}
      <div className="mb-12">
        <p className="text-sm tracking-widest-custom text-muted-foreground mb-4">
          ASK A YES OR NO QUESTION
        </p>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Will I find love?"
          className="w-full bg-transparent border-b-2 border-foreground py-4 text-xl md:text-2xl font-display tracking-tighter-custom placeholder:text-muted-foreground focus:outline-none text-center"
        />
      </div>

      {/* Coin */}
      <div 
        className="relative flex items-center justify-center py-8 cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={flipCoin}
        style={{ perspective: 1000 }}
      >
        <motion.div
          style={{
            rotateX: isFlipping ? 0 : springRotateX,
            rotateY: isFlipping ? 0 : springRotateY,
          }}
          className="relative"
        >
          <motion.img
            src={yinYangImage}
            alt="Flip Coin"
            className="w-48 h-48 md:w-64 md:h-64 select-none"
            animate={{
              rotateY: isFlipping ? [0, 1080] : 0,
              scale: isFlipping ? [1, 1.1, 1] : 1,
            }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
            }}
            whileHover={!isFlipping ? { scale: 1.05 } : {}}
            whileTap={!isFlipping ? { scale: 0.95 } : {}}
          />
          
          {/* Glow effect */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            animate={{
              boxShadow: isFlipping 
                ? "0 0 80px 30px rgba(255,255,255,0.2)" 
                : "0 0 30px 10px rgba(255,255,255,0.05)",
            }}
            transition={{ duration: 0.4 }}
          />
        </motion.div>
      </div>

      <p className="text-sm tracking-widest-custom text-muted-foreground text-center mb-8">
        {isFlipping ? "FLIPPING..." : "CLICK TO FLIP"}
      </p>

      {/* Result */}
      <motion.div
        initial={false}
        animate={{ 
          opacity: showResult ? 1 : 0,
          y: showResult ? 0 : 20,
        }}
        className="text-center"
      >
        {result && (
          <>
            <h2 className="text-7xl md:text-9xl font-display tracking-tighter-custom mb-6">
              {result}
            </h2>
            <button
              onClick={reset}
              className="text-sm tracking-widest-custom editorial-link text-muted-foreground hover:text-foreground"
            >
              ASK AGAIN
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  );
};

export default CoinFlipGame;
