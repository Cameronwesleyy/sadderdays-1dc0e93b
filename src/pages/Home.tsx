import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import bandDuo from "@/assets/band-duo.jpg";
import yinYangCover from "@/assets/yin-yang-cover.jpg";

const Home = () => {
  return (
    <PageTransition>
      <div className="min-h-screen py-24">
        <div className="container mx-auto px-6">
          {/* Hero - Minimal */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-32"
          >
            <p className="text-xs tracking-widest-custom text-muted-foreground mb-8">
              HOUSTON, TX
            </p>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-thin tracking-tighter-custom mb-8">
              Sadder Days
            </h1>
            <p className="text-muted-foreground max-w-md text-sm leading-relaxed">
              RnB meets Metal. A path for Black culture to become synonymous with elegance, class, and sensuality.
            </p>
          </motion.div>

          {/* Stacked Photo Cards - Cargo style */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="relative mb-32"
          >
            <div className="grid md:grid-cols-2 gap-8 md:gap-16">
              {/* Main image */}
              <div className="relative">
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  src={bandDuo}
                  alt="Grant and Cameron"
                  className="w-full aspect-[4/5] object-cover"
                />
                <p className="mt-4 text-xs text-muted-foreground">
                  Grant & Cameron, 2024
                </p>
              </div>

              {/* Second image offset */}
              <div className="relative md:mt-24">
                <motion.img
                  whileHover={{ scale: 1.02 }}
                  src={yinYangCover}
                  alt="Yin Yang"
                  className="w-full aspect-square object-cover"
                />
                <p className="mt-4 text-xs text-muted-foreground">
                  Yin/Yang Cover Art
                </p>
              </div>
            </div>
          </motion.div>

          {/* Links Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border mb-32"
          >
            {[
              { label: "Music", link: "/music" },
              { label: "Merch", link: "/merch" },
              { label: "Lab", link: "/lab" },
              { label: "About", link: "/about" },
            ].map((item) => (
              <Link key={item.label} to={item.link}>
                <motion.div
                  whileHover={{ backgroundColor: "hsl(var(--accent))" }}
                  className="bg-background p-8 md:p-12 text-center transition-colors"
                >
                  <span className="text-xs tracking-widest-custom">
                    {item.label.toUpperCase()}
                  </span>
                </motion.div>
              </Link>
            ))}
          </motion.div>

          {/* Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <p className="text-lg md:text-xl font-light text-muted-foreground leading-relaxed mb-4">
              "The band will not stop until the world has had Sadder Days."
            </p>
            <p className="text-xs text-muted-foreground">
              — And even then, they're going to keep going.
            </p>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Home;
