import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowLeft, Crown, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const DEVELOPER = {
  name: "Shahamat Shakeel",
  bio: "I am a passionate developer and technology enthusiast with a strong interest in game development, AI, and software engineering. I enjoy creating interactive and user-friendly projects that solve real-world problems and improve user experience.",
  bio2: "Currently, I am focusing on improving my skills in programming and exploring innovative ideas in the field of technology. I am always eager to learn new tools and grow as a developer while building impactful projects.",
  github: "https://github.com/shahamatshakeel-ux",
  linkedin: "https://www.linkedin.com/in/shahamat-shakeel-1b4601403",
  email: "shahamatshakeel@example.com", // TODO: replace with real email
  initials: "SS",
};

const LINKS = [
  { label: "GitHub", href: DEVELOPER.github, icon: Github, color: "hover:text-neon-pink", bg: "from-primary/20 to-neon-pink/10" },
  { label: "LinkedIn", href: DEVELOPER.linkedin, icon: Linkedin, color: "hover:text-neon-blue", bg: "from-neon-blue/20 to-primary/10" },
  { label: "Email", href: `mailto:${DEVELOPER.email}`, icon: Mail, color: "hover:text-accent", bg: "from-accent/20 to-neon-orange/10" },
];

const About = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 md:p-12 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-neon-pink/5 to-neon-blue/8 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-neon-pink to-neon-blue" />

        <div className="relative z-10 flex flex-col items-center text-center">
          {/* Avatar */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.1 }}
            className="relative mb-5"
          >
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-primary via-neon-pink to-neon-blue p-1">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                <span className="font-display text-3xl font-bold text-gradient-primary">
                  {DEVELOPER.initials}
                </span>
              </div>
            </div>
            <Crown
              className="absolute -top-2 -right-2 w-7 h-7 text-accent drop-shadow-[0_0_12px_hsl(var(--accent)/0.6)]"
              fill="currentColor"
            />
          </motion.div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary mb-3">
            <Sparkles className="w-3 h-3" /> Developer Info
          </div>

          <h1 className="font-display text-3xl md:text-4xl font-bold text-gradient-primary mb-2">
            {DEVELOPER.name}
          </h1>
          <p className="text-sm text-muted-foreground mb-6">
            Aspiring Software Developer • AI Enthusiast • BAI - Student at FAST-NUCES
          </p>

          <div className="space-y-3 text-left max-w-xl text-muted-foreground leading-relaxed">
            <p>{DEVELOPER.bio}</p>
            <p>{DEVELOPER.bio2}</p>
          </div>
        </div>
      </motion.div>

      {/* Contact links */}
      <div className="grid sm:grid-cols-3 gap-4">
        {LINKS.map(({ label, href, icon: Icon, color, bg }, i) => (
          <motion.a
            key={label}
            href={href}
            target={href.startsWith("mailto:") ? undefined : "_blank"}
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1 }}
            className="glass-card-hover p-5 group relative overflow-hidden"
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${bg} opacity-0 group-hover:opacity-100 transition-opacity`} />
            <div className="relative z-10 flex items-center gap-3">
              <div className={`w-11 h-11 rounded-xl bg-background/50 border border-border flex items-center justify-center transition-transform group-hover:scale-110 ${color}`}>
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="font-display font-bold text-sm">{label}</div>
                <div className="text-xs text-muted-foreground truncate max-w-[150px]">
                  {label === "Email" ? DEVELOPER.email : href.replace(/^https?:\/\//, "")}
                </div>
              </div>
            </div>
          </motion.a>
        ))}
      </div>

      <div className="text-center">
        <Link to="/" className="gradient-button px-8 py-3 inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Main Menu
        </Link>
      </div>
    </div>
  );
};

export default About;
