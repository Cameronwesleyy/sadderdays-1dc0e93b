import { useState } from "react";
import { motion } from "framer-motion";
import { Play, ExternalLink } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import duoPortrait from "@/assets/duo-portrait.jpg";
import grantPortrait from "@/assets/grant-portrait.jpg";
import cameronPortrait from "@/assets/cameron-portrait.jpg";
import handsCover from "@/assets/hands-cover.jpg";
import yinYangCover from "@/assets/yin-yang-cover.jpg";
import bandDuo from "@/assets/band-duo.jpg";
import merch01 from "@/assets/merch-01.jpg";
import merch02 from "@/assets/merch-02.jpg";
import merch03 from "@/assets/merch-03.jpg";
import merch04 from "@/assets/merch-04.jpg";
import merch05 from "@/assets/merch-05.jpg";
import merch06 from "@/assets/merch-06.jpg";
import CrossIcon from "@/components/CrossIcon";

const releases = [
  { 
    title: "Push (Back It up)", 
    type: "Single", 
    year: "2025", 
    cover: duoPortrait,
    spotifyUrl: "https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE",
    appleUrl: "https://music.apple.com/us/artist/sadder-days/1563767142"
  },
  { 
    title: "Fly", 
    type: "Single", 
    year: "2025", 
    cover: grantPortrait,
    spotifyUrl: "https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE",
    appleUrl: "https://music.apple.com/us/artist/sadder-days/1563767142"
  },
  { 
    title: "Masquerade", 
    type: "Single", 
    year: "2025", 
    cover: handsCover,
    spotifyUrl: "https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE",
    appleUrl: "https://music.apple.com/us/artist/sadder-days/1563767142"
  },
  { 
    title: "Zen", 
    type: "Single", 
    year: "2025", 
    cover: cameronPortrait,
    spotifyUrl: "https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE",
    appleUrl: "https://music.apple.com/us/artist/sadder-days/1563767142"
  },
  { 
    title: "Misery", 
    type: "Single", 
    year: "2025", 
    cover: bandDuo,
    spotifyUrl: "https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE",
    appleUrl: "https://music.apple.com/us/artist/sadder-days/1563767142"
  },
  { 
    title: "Guilty Pleasure", 
    type: "Single", 
    year: "2025", 
    cover: merch01,
    spotifyUrl: "https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE",
    appleUrl: "https://music.apple.com/us/artist/sadder-days/1563767142"
  },
  { 
    title: "Dread", 
    type: "Single", 
    year: "2025", 
    cover: merch02,
    spotifyUrl: "https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE",
    appleUrl: "https://music.apple.com/us/artist/sadder-days/1563767142"
  },
  { 
    title: "Whispers in the Garth", 
    type: "Single", 
    year: "2025", 
    cover: merch03,
    spotifyUrl: "https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE",
    appleUrl: "https://music.apple.com/us/artist/sadder-days/1563767142"
  },
  { 
    title: "Write Back", 
    type: "Single", 
    year: "2024", 
    cover: merch04,
    spotifyUrl: "https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE",
    appleUrl: "https://music.apple.com/us/artist/sadder-days/1563767142"
  },
  { 
    title: "You and My Desire", 
    type: "Single", 
    year: "2024", 
    cover: merch05,
    spotifyUrl: "https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE",
    appleUrl: "https://music.apple.com/us/artist/sadder-days/1563767142"
  },
  { 
    title: "Crave", 
    type: "Single", 
    year: "2024", 
    cover: merch06,
    spotifyUrl: "https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE",
    appleUrl: "https://music.apple.com/us/artist/sadder-days/1563767142"
  },
  { 
    title: "YIN/YANG", 
    type: "EP", 
    year: "2023", 
    cover: yinYangCover,
    spotifyUrl: "https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE",
    appleUrl: "https://music.apple.com/us/artist/sadder-days/1563767142"
  },
];

const Music = () => {
  const [hoveredRelease, setHoveredRelease] = useState<string | null>(null);

  return (
    <PageTransition>
      <div className="min-h-screen px-6 py-24">
        <div className="max-w-7xl mx-auto">
          {/* Header with streaming links */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-massive font-display tracking-tighter-custom"
            >
              MUSIC
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex gap-6"
            >
              <a
                href="https://open.spotify.com/artist/09pCD0j6zTSon9okqgWkqE"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-[#1DB954] text-background text-xs tracking-widest-custom font-medium hover:opacity-80 transition-opacity"
              >
                SPOTIFY <ExternalLink size={12} />
              </a>
              <a
                href="https://music.apple.com/us/artist/sadder-days/1563767142"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-foreground text-background text-xs tracking-widest-custom font-medium hover:opacity-80 transition-opacity"
              >
                APPLE MUSIC <ExternalLink size={12} />
              </a>
            </motion.div>
          </div>

          {/* Releases grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 md:gap-6"
          >
            {releases.map((release, index) => (
              <motion.div
                key={release.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onMouseEnter={() => setHoveredRelease(release.title)}
                onMouseLeave={() => setHoveredRelease(null)}
                className="group cursor-pointer"
              >
                {/* Cover Image */}
                <div className="relative aspect-square mb-3 overflow-hidden">
                  <img
                    src={release.cover}
                    alt={release.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Cross overlay */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <CrossIcon className="w-12 h-12 text-background/80" />
                  </div>

                  {/* Hover overlay with play buttons */}
                  <div className={`absolute inset-0 bg-background/90 flex flex-col items-center justify-center gap-3 transition-opacity duration-300 ${
                    hoveredRelease === release.title ? 'opacity-100' : 'opacity-0'
                  }`}>
                    <a
                      href={release.spotifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-[#1DB954] text-background text-[10px] tracking-widest-custom font-medium hover:scale-105 transition-transform"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Play size={12} fill="currentColor" /> SPOTIFY
                    </a>
                    <a
                      href={release.appleUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-3 py-2 bg-foreground text-background text-[10px] tracking-widest-custom font-medium hover:scale-105 transition-transform"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Play size={12} fill="currentColor" /> APPLE
                    </a>
                  </div>
                </div>

                {/* Release info */}
                <h3 className="font-display text-sm tracking-tight leading-tight mb-1 group-hover:text-sd-pink transition-colors">
                  {release.title} - {release.type}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {release.year}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Spotify Embed */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-16"
          >
            <p className="text-[10px] tracking-widest-custom text-muted-foreground mb-4">
              LISTEN NOW
            </p>
            <iframe
              src="https://open.spotify.com/embed/artist/09pCD0j6zTSon9okqgWkqE?utm_source=generator&theme=0"
              width="100%"
              height="352"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="opacity-80 hover:opacity-100 transition-opacity rounded-lg"
            />
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Music;
