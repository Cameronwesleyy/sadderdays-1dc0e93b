import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface ScrollRevealHeroProps {
  imageSrc: string;
  imageAlt: string;
  children?: React.ReactNode;
  onHoverChange?: (isHovered: boolean) => void;
}

const ScrollRevealHero = ({ imageSrc, imageAlt, children, onHoverChange }: ScrollRevealHeroProps) => {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  const [sectionHeight, setSectionHeight] = useState("100vh");

  // Calculate how tall the section needs to be to show full image
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight });
      setImageLoaded(true);
      
      // Calculate section height based on image aspect ratio
      // We want the image to be full-width and show its full height when scrolled
      if (!isMobile && typeof window !== 'undefined') {
        const viewportWidth = window.innerWidth;
        const imageAspect = img.naturalWidth / img.naturalHeight;
        const imageHeightAtFullWidth = viewportWidth / imageAspect;
        // Section height = viewport height + extra scroll needed to reveal full image
        const extraScroll = Math.max(0, imageHeightAtFullWidth - window.innerHeight);
        setSectionHeight(`calc(100vh + ${extraScroll}px)`);
      }
    };
    img.src = imageSrc;
  }, [imageSrc, isMobile]);

  // For desktop scroll - image moves up as you scroll to reveal more
  const { scrollY } = useScroll();
  
  // Calculate the scroll range based on how much extra we need to scroll
  const scrollRange = imageDimensions.width && imageDimensions.height && typeof window !== 'undefined'
    ? Math.max(0, (window.innerWidth / (imageDimensions.width / imageDimensions.height)) - window.innerHeight)
    : 500;
  
  const imageY = useTransform(scrollY, [0, scrollRange], [0, -scrollRange]);

  if (isMobile) {
    // Mobile: Horizontal scrollable hero that shows full image
    const aspectRatio = imageDimensions.width / imageDimensions.height || 16 / 9;
    const imageWidth = `${100 * aspectRatio}vh`;

    return (
      <section 
        className="relative h-screen w-screen overflow-hidden"
        onMouseEnter={() => onHoverChange?.(true)}
        onMouseLeave={() => onHoverChange?.(false)}
      >
        {/* Scrollable container */}
        <div 
          ref={scrollContainerRef}
          className="h-full overflow-x-auto overflow-y-hidden scrollbar-hide"
          style={{ WebkitOverflowScrolling: 'touch' }}
        >
          <div 
            className="h-full relative"
            style={{ width: imageLoaded ? imageWidth : '100vw', minWidth: '100vw' }}
          >
            <img 
              src={imageSrc} 
              alt={imageAlt} 
              className="h-full w-auto object-cover object-center"
              style={{ minWidth: '100vw' }}
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white/60"
        >
          <motion.div
            animate={{ x: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <svg className="w-4 h-4 rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
          <span className="text-[8px] tracking-widest-custom uppercase">Swipe</span>
          <motion.div
            animate={{ x: [0, -8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <svg className="w-4 h-4 -rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
        
        {/* Children (text overlay etc) */}
        {children}
      </section>
    );
  }

  // Desktop: Scroll reveals full image, text stays fixed
  return (
    <section 
      ref={containerRef}
      className="relative w-screen"
      style={{ height: sectionHeight }}
      onMouseEnter={() => onHoverChange?.(true)}
      onMouseLeave={() => onHoverChange?.(false)}
    >
      {/* Sticky viewport container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Image that scrolls up to reveal full photo */}
        <motion.div 
          className="absolute top-0 left-0 w-full"
          style={{ y: imageY }}
        >
          <img 
            src={imageSrc} 
            alt={imageAlt} 
            className="w-full h-auto"
          />
        </motion.div>

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent pointer-events-none" />
        
        {/* Children (text overlay etc) - stays fixed within sticky container */}
        {children}

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/60"
        >
          <span className="text-[8px] tracking-widest-custom uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ScrollRevealHero;
