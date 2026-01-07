import { motion } from "framer-motion";
import { Instagram, ExternalLink } from "lucide-react";
import PageTransition from "@/components/PageTransition";
import CrossIcon from "@/components/CrossIcon";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const PatreonIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M14.82 2.41c3.96 0 7.18 3.24 7.18 7.21 0 3.96-3.22 7.18-7.18 7.18-3.97 0-7.21-3.22-7.21-7.18 0-3.97 3.24-7.21 7.21-7.21M2 21.6h3.5V2.41H2V21.6z"/>
  </svg>
);

const members = [
  {
    name: "GRANT",
    role: "DRUMS / PERCUSSION",
    color: "CELESTINE BLUE",
    personality: "ENFJ-A",
    birthday: "06/12/2003",
    signs: "GEMINI · SAGITTARIUS · SCORPIO",
    bio: "The rhythmic heartbeat and co-founder. Started at 17 with no aspirations of becoming a musician. The moment he laid hands on the drum kit, he \"felt like a kid again.\" His style—a blend of RnB, House, Jazz, and Hip-Hop—adds a danceable underbelly to the band's sound.",
    socials: [
      { icon: Instagram, href: "#" },
      { icon: TikTokIcon, href: "#" },
      { icon: PatreonIcon, href: "#" },
    ],
  },
  {
    name: "CAMERON",
    role: "GUITAR / PRODUCTION",
    color: "FOREST GREEN",
    personality: "INFP-A",
    birthday: "08/08/2002",
    signs: "LEO · LEO · SCORPIO",
    bio: "The guitarist and founder. Taught himself guitar during quarantine at 17. His style is distinct, sensual, melodic, and elegant. He writes songs entirely in his head before touching an instrument. \"You're only limited by how big you can think.\"",
    socials: [
      { icon: Instagram, href: "#" },
      { icon: TikTokIcon, href: "#" },
      { icon: PatreonIcon, href: "#" },
    ],
    links: [
      { name: "GET HIS TONE", href: "#" },
      { name: "EQUIPMENT", href: "#" },
      { name: "WALLPAPERS", href: "#" },
      { name: "PLAYLIST", href: "#" },
    ],
  },
];

const Members = () => {
  return (
    <PageTransition>
      <div className="min-h-screen pt-24 pb-16">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center mb-24"
          >
            <p className="text-xs tracking-widest-custom text-muted-foreground">
              THE DUO
            </p>
          </motion.div>

          {/* Members */}
          <div className="max-w-4xl mx-auto space-y-32">
            {members.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="grid md:grid-cols-2 gap-12"
              >
                {/* Photo placeholder */}
                <div className={`aspect-[3/4] bg-muted/20 ${index % 2 === 1 ? "md:order-2" : ""}`}>
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-[8rem] font-bold tracking-tighter-custom opacity-5">
                      {member.name.charAt(0)}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className={`space-y-6 ${index % 2 === 1 ? "md:order-1" : ""}`}>
                  <div>
                    <h2 className="text-4xl font-bold tracking-tighter-custom mb-2">
                      {member.name}
                    </h2>
                    <p className="text-xs tracking-widest-custom text-muted-foreground">
                      {member.role}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs py-6 border-y border-border/20">
                    <div>
                      <p className="text-muted-foreground/50 mb-1">COLOR</p>
                      <p>{member.color}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground/50 mb-1">TYPE</p>
                      <p>{member.personality}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground/50 mb-1">BIRTHDAY</p>
                      <p>{member.birthday}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground/50 mb-1">SIGNS</p>
                      <p>{member.signs}</p>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Links */}
                  {member.links && (
                    <div className="flex flex-wrap gap-2 pt-4">
                      {member.links.map((link) => (
                        <a
                          key={link.name}
                          href={link.href}
                          className="text-[10px] tracking-widest-custom px-3 py-2 border border-border/30 hover:border-foreground/30 transition-colors flex items-center gap-2"
                        >
                          {link.name}
                          <ExternalLink size={10} />
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Socials */}
                  <div className="flex gap-3 pt-2">
                    {member.socials.map(({ icon: Icon, href }, i) => (
                      <a
                        key={i}
                        href={href}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Icon />
                      </a>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer Cross */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-32"
          >
            <CrossIcon size="sm" className="text-muted-foreground/20" />
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Members;
