import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import PageTransition from "@/components/PageTransition";

const streamingPlatforms = [
  { name: "Spotify", url: "https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE" },
  { name: "Apple Music", url: "https://music.apple.com/us/artist/sadder-days/1563767142" },
];

const releases = [
  { title: "MISERY", type: "Single" },
  { title: "GUILTY PLEASURE", type: "Single" },
];

const Music = () => {
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
              DISCOGRAPHY
            </p>
            <h1 className="text-4xl md:text-5xl font-thin tracking-tighter-custom">
              Music
            </h1>
          </motion.div>

          {/* Streaming Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="flex gap-4 mb-16"
          >
            {streamingPlatforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 border border-border text-xs tracking-widest-custom hover:bg-foreground hover:text-background transition-colors flex items-center gap-2"
              >
                {platform.name.toUpperCase()}
                <ExternalLink size={10} />
              </a>
            ))}
          </motion.div>

          {/* Spotify Embed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-16"
          >
            <iframe
              style={{ borderRadius: "0px" }}
              src="https://open.spotify.com/embed/artist/09pCD0j6zTSon9okqgWkqE?utm_source=generator&theme=0"
              width="100%"
              height="352"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="border border-border"
            />
          </motion.div>

          {/* Releases List */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-xs tracking-widest-custom text-muted-foreground mb-8">
              RELEASES
            </p>
            <div className="space-y-0">
              {releases.map((release, index) => (
                <motion.div
                  key={release.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-center justify-between py-6 border-b border-border group"
                >
                  <span className="text-lg font-thin tracking-tighter-custom">
                    {release.title}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {release.type}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Music;
