import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Enter = () => {
  const navigate = useNavigate();
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  
  // Smooth spring physics for mouse movement
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  // Transform mouse position to offset values for each column
  const col1Y = useTransform(smoothY, [0, 1], [100, -100]);
  const col2Y = useTransform(smoothY, [0, 1], [-80, 80]);
  const col3Y = useTransform(smoothY, [0, 1], [120, -120]);
  
  const col1X = useTransform(smoothX, [0, 1], [-30, 30]);
  const col2X = useTransform(smoothX, [0, 1], [20, -20]);
  const col3X = useTransform(smoothX, [0, 1], [-25, 25]);

  const handleEnter = () => {
    navigate("/home");
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setMousePos({ x, y });
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const columns = 3;
  const rowsPerColumn = 30;
  const text = "sadderdays.world";

  const columnTransforms = [
    { y: col1Y, x: col1X, direction: 1 },
    { y: col2Y, x: col2X, direction: -1 },
    { y: col3Y, x: col3X, direction: 1 },
  ];

  return (
    <motion.div
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black z-50 overflow-hidden cursor-pointer"
      onClick={handleEnter}
    >
      {/* Main grid of text with mouse interaction */}
      <div className="absolute inset-0 flex w-screen">
        {Array.from({ length: columns }).map((_, colIndex) => (
          <motion.div
            key={colIndex}
            className="flex-1 flex flex-col items-center overflow-visible"
            style={{
              y: columnTransforms[colIndex].y,
              x: columnTransforms[colIndex].x,
            }}
          >
            {/* Vertical scrolling marquee */}
            <motion.div
              animate={{
                y: columnTransforms[colIndex].direction === 1 
                  ? ["0%", "-50%"] 
                  : ["-50%", "0%"],
              }}
              transition={{
                duration: 20 + colIndex * 5,
                repeat: Infinity,
                ease: "linear",
              }}
              className="flex flex-col items-center"
            >
              {/* Double the content for seamless loop */}
              {[...Array(2)].map((_, loopIndex) => (
                <div key={loopIndex} className="flex flex-col items-center">
                  {Array.from({ length: rowsPerColumn }).map((_, rowIndex) => {
                    const opacityPattern = [1, 0.1, 0.03, 0.2, 0.35, 0.05, 0.15, 0.4, 0.07, 0.28];
                    const opacity = opacityPattern[(rowIndex + colIndex * 3) % opacityPattern.length];
                    
                    return (
                      <div
                        key={rowIndex}
                        className="text-white font-black text-[clamp(1.4rem,5vw,3.5rem)] leading-[1.1] tracking-tight whitespace-nowrap"
                        style={{
                          opacity,
                          fontFamily: "'Inter', sans-serif",
                          fontWeight: 900,
                        }}
                      >
                        {text}
                      </div>
                    );
                  })}
                </div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Mouse-reactive glow that follows cursor */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x * 100}% ${mousePos.y * 100}%, rgba(255,255,255,0.04) 0%, transparent 60%)`,
        }}
      />

      {/* Center "PUSH TO ENTER" overlay */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="relative px-8 py-4"
        >
          {/* Dark backdrop for visibility */}
          <div className="absolute inset-0 bg-black/80 blur-3xl scale-[2]" />
          
          <motion.p
            animate={{ 
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="relative text-white text-[11px] md:text-sm tracking-[0.5em] font-medium"
          >
            PUSH TO ENTER
          </motion.p>
        </motion.div>
      </div>

      {/* Grain overlay */}
      <div className="grain-overlay" />
    </motion.div>
  );
};

export default Enter;
