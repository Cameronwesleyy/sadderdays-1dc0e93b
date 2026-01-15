import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import napkin from "@/assets/napkin.png";

const Enter = () => {
  const navigate = useNavigate();
  const [isExiting, setIsExiting] = useState(false);

  const handleEnter = () => {
    if (isExiting) return;
    setIsExiting(true);
    setTimeout(() => {
      navigate("/home");
    }, 1200);
  };

  // Generate random directions for fabric pieces
  const fabricPieces = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: (Math.random() - 0.5) * 1500,
    y: (Math.random() - 0.5) * 1500,
    rotation: (Math.random() - 0.5) * 720,
    delay: Math.random() * 0.2,
    originX: `${(i % 4) * 25 + 12.5}%`,
    originY: `${Math.floor(i / 4) * 33 + 16.5}%`,
  }));

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-transparent z-50 overflow-hidden cursor-pointer flex items-center justify-center"
      onClick={handleEnter}
    >
      {/* Napkin container */}
      <div className="relative">
        <AnimatePresence>
          {!isExiting ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative flex flex-col items-center"
            >
              {/* Napkin image */}
              <motion.img
                src={napkin}
                alt="Sadder Days Napkin"
                className="w-72 md:w-96 h-auto"
                style={{ mixBlendMode: 'multiply' }}
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              
              {/* Push to enter text overlay */}
              <motion.p
                animate={{ 
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-8 text-[10px] md:text-xs tracking-[0.4em] font-light text-neutral-500"
              >
                PUSH TO ENTER
              </motion.p>
            </motion.div>
          ) : (
            // Flying fabric pieces
            <>
              {fabricPieces.map((piece) => (
                <motion.div
                  key={piece.id}
                  initial={{ 
                    opacity: 1, 
                    x: 0, 
                    y: 0, 
                    rotate: 0,
                    scale: 1,
                  }}
                  animate={{ 
                    opacity: 0,
                    x: piece.x,
                    y: piece.y,
                    rotate: piece.rotation,
                    scale: 0.3,
                  }}
                  transition={{ 
                    duration: 1,
                    delay: piece.delay,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="absolute"
                  style={{
                    width: '25%',
                    height: '33%',
                    overflow: 'hidden',
                    left: `${(piece.id % 4) * 25}%`,
                    top: `${Math.floor(piece.id / 4) * 33}%`,
                  }}
                >
                  <img
                    src={napkin}
                    alt=""
                    className="w-72 md:w-96 h-auto absolute"
                    style={{ 
                      mixBlendMode: 'multiply',
                      left: `-${(piece.id % 4) * 100}%`,
                      top: `-${Math.floor(piece.id / 4) * 100}%`,
                    }}
                  />
                </motion.div>
              ))}
            </>
          )}
        </AnimatePresence>
      </div>

      {/* Grain overlay */}
      <div className="grain-overlay" />
    </motion.div>
  );
};

export default Enter;