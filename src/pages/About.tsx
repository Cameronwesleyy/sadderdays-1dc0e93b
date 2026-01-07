import { useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import CrossIcon from "@/components/CrossIcon";
import aboutHero from "@/assets/about-hero.jpg";

const About = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsSubmitted(true);
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen">
        {/* Hero Image */}
        <section className="relative h-screen">
          <img
            src={aboutHero}
            alt="Sadder Days"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <CrossIcon size="lg" className="text-cream" />
          </div>
        </section>

        {/* Story Section */}
        <section className="py-24 px-6">
          <div className="max-w-2xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-xs tracking-widest-custom text-muted-foreground mb-4">
                HOUSTON, TEXAS
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-8 text-sm leading-relaxed text-muted-foreground"
            >
              <p>
                Sadder Days combines influences from RnB, Jazz, and Classical music 
                to create a unique metal experience that blends sensual grooves, 
                elegant rhythms, and nocturnal soundscapes.
              </p>

              <p>
                Members Grant and Cameron have been friends since elementary school, 
                taking up their respective instruments in the Summer of 2020. From 
                the start, the band wanted their music to provide a path for Black 
                culture to become synonymous with elegance, class, and sensuality.
              </p>

              <p>
                Pulling from prominent influences in Black music, Sadder Days created 
                their own genre, "RnM"—combining sounds from RnB, Jazz, Gospel, House, 
                Hip-Hop, and Classical music, wrapped in a neat, Metal package.
              </p>

              <p>
                Nothing about the band is "just good enough". Every aspect has been 
                carefully thought of and accounted for.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mt-16 text-center"
            >
              <p className="text-sm italic text-muted-foreground">
                "The band will not stop until the world has had Sadder Days."
              </p>
              <p className="text-xs text-muted-foreground/60 mt-4">
                (And even then, they're going to keep going.)
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="flex justify-center mt-16"
            >
              <CrossIcon size="sm" className="text-muted-foreground/30" />
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-24 px-6 border-t border-border/20">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-xs tracking-widest-custom text-muted-foreground">
                CONTACT
              </p>
            </motion.div>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <p className="text-sm text-muted-foreground">Message received.</p>
              </motion.div>
            ) : (
              <motion.form
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Name"
                  className="w-full bg-transparent border-b border-border/50 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/50 transition-colors"
                />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email"
                  className="w-full bg-transparent border-b border-border/50 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/50 transition-colors"
                />
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Message"
                  rows={4}
                  className="w-full bg-transparent border-b border-border/50 py-3 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:border-foreground/50 transition-colors resize-none"
                />
                <motion.button
                  whileHover={{ opacity: 0.7 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex items-center gap-3 text-xs tracking-widest-custom"
                >
                  SEND
                  <Send size={12} />
                </motion.button>
              </motion.form>
            )}
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default About;
