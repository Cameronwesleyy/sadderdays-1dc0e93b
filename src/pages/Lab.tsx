import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, RefreshCw, ArrowRight } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import yinYangLogo from "@/assets/yin-yang-logo.png";
import cameron from "@/assets/cameron.jpg";
import grant from "@/assets/grant.jpg";
import bandDuo from "@/assets/band-duo.jpg";
import yinYangCover from "@/assets/yin-yang-cover.jpg";

const Lab = () => {
  const [activeTab, setActiveTab] = useState<"generator" | "quiz">("generator");

  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-16"
          >
            <p className="text-xs tracking-widest-custom text-muted-foreground mb-4">
              INTERACTIVE
            </p>
            <h1 className="text-4xl md:text-5xl font-thin tracking-tighter-custom">
              The Lab
            </h1>
          </motion.div>

          {/* Stacked Photo Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-16"
          >
            <PhotoCardStack />
          </motion.div>

          {/* Tabs */}
          <div className="flex gap-8 mb-12 border-b border-border">
            {[
              { id: "generator", label: "Generator" },
              { id: "quiz", label: "Quiz" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as "generator" | "quiz")}
                className={`pb-4 text-xs tracking-widest-custom transition-all border-b-2 -mb-px ${
                  activeTab === tab.id
                    ? "border-foreground text-foreground"
                    : "border-transparent text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            {activeTab === "generator" ? (
              <YinYangGenerator key="generator" />
            ) : (
              <QuizSection key="quiz" />
            )}
          </AnimatePresence>
        </div>
      </div>
    </PageTransition>
  );
};

const PhotoCardStack = () => {
  const images = [
    { src: cameron, label: "Cameron" },
    { src: grant, label: "Grant" },
    { src: bandDuo, label: "Duo" },
    { src: yinYangCover, label: "Yin/Yang" },
  ];

  return (
    <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
      {images.map((img, index) => (
        <motion.div
          key={img.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="absolute"
          style={{
            left: `${10 + index * 15}%`,
            top: `${5 + index * 8}%`,
            zIndex: index,
            transform: `rotate(${-8 + index * 5}deg)`,
          }}
          whileHover={{ 
            scale: 1.05, 
            zIndex: 10,
            rotate: 0,
          }}
        >
          <div className="w-48 md:w-64 bg-background p-2 shadow-2xl">
            <img
              src={img.src}
              alt={img.label}
              className="w-full aspect-[3/4] object-cover"
            />
            <p className="text-[10px] text-muted-foreground mt-2 text-center">
              {img.label}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const YinYangGenerator = () => {
  const [text, setText] = useState("SADDER DAYS");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logoRef = useRef<HTMLImageElement | null>(null);

  const generateImage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !logoRef.current) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const size = 600;
    canvas.width = size;
    canvas.height = size;

    // Background
    ctx.fillStyle = "#0B0C0B";
    ctx.fillRect(0, 0, size, size);

    // Draw the yin yang logo
    const logo = logoRef.current;
    const logoSize = size * 0.7;
    const logoX = (size - logoSize) / 2;
    const logoY = (size - logoSize) / 2;
    ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);

    // Draw text curved around the logo
    const displayText = text.toUpperCase();
    ctx.save();
    ctx.font = "bold 18px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillStyle = "#FBFCFC";
    
    const centerX = size / 2;
    const centerY = size / 2;
    const textRadius = size * 0.42;
    
    // Draw text in arc at the top
    for (let i = 0; i < displayText.length; i++) {
      const angle = -Math.PI / 2 + (i - displayText.length / 2 + 0.5) * 0.15;
      const x = centerX + Math.cos(angle) * textRadius;
      const y = centerY + Math.sin(angle) * textRadius;
      
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(angle + Math.PI / 2);
      ctx.fillText(displayText[i], 0, 0);
      ctx.restore();
    }
    
    ctx.restore();

    // Subtle grain
    const imageData = ctx.getImageData(0, 0, size, size);
    const data = imageData.data;
    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 8;
      data[i] = Math.min(255, Math.max(0, data[i] + noise));
      data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
      data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
    }
    ctx.putImageData(imageData, 0, 0);
  }, [text]);

  useEffect(() => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      logoRef.current = img;
      generateImage();
    };
    img.src = yinYangLogo;
  }, [generateImage]);

  useEffect(() => {
    if (logoRef.current) {
      generateImage();
    }
  }, [text, generateImage]);

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement("a");
    link.download = `sadderdays-${text.toLowerCase().replace(/\s+/g, "-")}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-lg mx-auto"
    >
      {/* Input */}
      <div className="mb-8">
        <label className="text-xs tracking-widest-custom text-muted-foreground mb-3 block">
          YOUR TEXT
        </label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value.slice(0, 20))}
          maxLength={20}
          placeholder="Enter text..."
          className="w-full bg-transparent border-b border-border py-3 text-xl font-thin tracking-tighter-custom placeholder:text-muted-foreground focus:outline-none focus:border-foreground transition-colors"
        />
      </div>

      {/* Canvas Preview */}
      <div className="relative aspect-square bg-background mb-8 border border-border">
        <canvas ref={canvasRef} className="w-full h-full object-contain" />
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={generateImage}
          className="flex-1 py-3 border border-border text-xs tracking-widest-custom hover:bg-accent transition-colors flex items-center justify-center gap-2"
        >
          <RefreshCw size={12} />
          REGENERATE
        </button>
        <button
          onClick={downloadImage}
          className="flex-1 py-3 bg-foreground text-background text-xs tracking-widest-custom hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <Download size={12} />
          DOWNLOAD
        </button>
      </div>
    </motion.div>
  );
};

const quizQuestions = [
  {
    question: "When you close your eyes, do you see...",
    options: [
      { text: "Endless light fading into softness", side: "yin" },
      { text: "Deep shadows with hidden depths", side: "yang" },
    ],
  },
  {
    question: "Your energy peaks during...",
    options: [
      { text: "The quiet hours before dawn", side: "yin" },
      { text: "The electric midnight atmosphere", side: "yang" },
    ],
  },
  {
    question: "In music, you're drawn to...",
    options: [
      { text: "Ethereal, floating melodies", side: "yin" },
      { text: "Heavy, grounding bass", side: "yang" },
    ],
  },
  {
    question: "Your ideal space feels...",
    options: [
      { text: "Open, minimal, breathing", side: "yin" },
      { text: "Dense, layered, intimate", side: "yang" },
    ],
  },
  {
    question: "You process emotions by...",
    options: [
      { text: "Letting them flow and release", side: "yin" },
      { text: "Channeling them into action", side: "yang" },
    ],
  },
];

const QuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<"yin" | "yang" | null>(null);

  const handleAnswer = (side: string) => {
    const newAnswers = [...answers, side];
    setAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 300);
    } else {
      const yinCount = newAnswers.filter((a) => a === "yin").length;
      setResult(yinCount >= 3 ? "yin" : "yang");
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="max-w-lg mx-auto"
    >
      <AnimatePresence mode="wait">
        {result ? (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xs tracking-widest-custom text-muted-foreground mb-4">
              YOUR RESULT
            </p>
            <h2 className="text-6xl font-thin tracking-tighter-custom mb-8">
              {result === "yin" ? "Yin" : "Yang"}
            </h2>
            <p className="text-muted-foreground mb-12 max-w-sm mx-auto text-sm">
              {result === "yin"
                ? "You embrace the quiet, the subtle, the flowing. Your energy is receptive and transformative."
                : "You embody the active, the bold, the dynamic. Your energy is creative and initiating."}
            </p>
            <button
              onClick={resetQuiz}
              className="text-xs tracking-widest-custom text-muted-foreground hover:text-foreground transition-colors"
            >
              TAKE AGAIN
            </button>
          </motion.div>
        ) : (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            {/* Progress */}
            <div className="flex gap-2 mb-12">
              {quizQuestions.map((_, index) => (
                <div
                  key={index}
                  className={`h-px flex-1 transition-colors ${
                    index <= currentQuestion ? "bg-foreground" : "bg-border"
                  }`}
                />
              ))}
            </div>

            <p className="text-xs tracking-widest-custom text-muted-foreground mb-8">
              {currentQuestion + 1} / {quizQuestions.length}
            </p>

            <h2 className="text-2xl font-thin tracking-tighter-custom mb-12">
              {quizQuestions[currentQuestion].question}
            </h2>

            <div className="space-y-4">
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  whileHover={{ x: 4 }}
                  onClick={() => handleAnswer(option.side)}
                  className="w-full p-6 text-left border border-border hover:border-foreground/50 transition-all group text-sm"
                >
                  <span className="flex items-center justify-between">
                    <span>{option.text}</span>
                    <ArrowRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    />
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Lab;
