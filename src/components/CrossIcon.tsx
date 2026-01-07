import { motion } from "framer-motion";

interface CrossIconProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  animated?: boolean;
}

const CrossIcon = ({ className = "", size = "md", animated = false }: CrossIconProps) => {
  const sizes = {
    sm: "w-4 h-8",
    md: "w-6 h-12",
    lg: "w-10 h-20",
  };

  const Wrapper = animated ? motion.svg : "svg";
  const wrapperProps = animated
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 0.6 },
      }
    : {};

  return (
    <Wrapper
      viewBox="0 0 24 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      className={`${sizes[size]} ${className}`}
      {...wrapperProps}
    >
      {/* Vertical line */}
      <line x1="12" y1="0" x2="12" y2="48" />
      {/* Upper horizontal */}
      <line x1="6" y1="10" x2="18" y2="10" />
      {/* Top cap */}
      <line x1="9" y1="5" x2="15" y2="5" />
    </Wrapper>
  );
};

export default CrossIcon;
