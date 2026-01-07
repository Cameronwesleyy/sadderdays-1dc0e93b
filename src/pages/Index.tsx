import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import PageTransition from "@/components/PageTransition";
import CrossIcon from "@/components/CrossIcon";
import homeHero from "@/assets/home-hero-1.jpg";

const Index = () => {
  return (
    <PageTransition>
      <div className="min-h-screen flex flex-col">
        {/* Hero Section - Full screen with minimal text */}
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img
              src={homeHero}
              alt="Sadder Days"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-background/40" />
          </div>

          <div className="relative z-10 text-center">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xs tracking-widest-custom text-foreground/70 mb-4"
            >
              "더 슬픈 날들"
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter-custom mb-8"
            >
              SADDER DAYS
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="flex justify-center"
            >
              <CrossIcon size="md" className="text-foreground/60" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-16"
            >
              <Link to="/merch">
                <motion.span
                  whileHover={{ opacity: 0.7 }}
                  className="text-xs tracking-widest-custom cursor-pointer"
                >
                  LOUNGEWEAR PACK 23'
                </motion.span>
              </Link>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-12 bg-gradient-to-b from-foreground/50 to-transparent"
            />
          </motion.div>
        </section>

        {/* Featured Grid */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-1">
              {[
                { title: "MERCH", link: "/merch" },
                { title: "MUSIC", link: "/music" },
                { title: "MEMBERS", link: "/members" },
              ].map((item, index) => (
                <Link key={item.title} to={item.link}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ backgroundColor: "hsl(var(--muted))" }}
                    className="p-12 text-center border border-border/20 transition-colors cursor-pointer"
                  >
                    <span className="text-xs tracking-widest-custom">
                      {item.title}
                    </span>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Index;
