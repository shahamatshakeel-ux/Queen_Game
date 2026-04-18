import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Crown, LayoutDashboard, Gamepad2, Trophy, History, User, LogIn, LogOut, Info } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const NAV_ITEMS = [
  { path: "/", label: "Home", icon: LayoutDashboard },
  { path: "/play", label: "Play", icon: Gamepad2 },
  { path: "/leaderboard", label: "Ranks", icon: Trophy },
  { path: "/history", label: "History", icon: History },
  { path: "/profile", label: "Profile", icon: User },
  { path: "/about", label: "About", icon: Info },
];

const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <div className="min-h-screen bg-background grid-bg">
      <nav className="sticky top-0 z-50 glass-card rounded-none border-x-0 border-t-0">
        <div className="container flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 group">
            <Crown className="w-7 h-7 text-primary group-hover:text-neon-pink transition-colors drop-shadow-[0_0_8px_hsl(var(--primary)/0.5)]" fill="currentColor" />
            <span className="font-display text-lg font-bold text-gradient-primary hidden sm:inline">
              QueenGame
            </span>
          </Link>

          <div className="flex items-center gap-0.5">
            {NAV_ITEMS.map(({ path, label, icon: Icon }) => {
              const active = location.pathname === path;
              return (
                <Link
                  key={path}
                  to={path}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm transition-all ${
                    active ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{label}</span>
                  {active && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute inset-0 rounded-xl bg-primary/10 border border-primary/20"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </div>

          {user ? (
            <button
              onClick={signOut}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm text-muted-foreground hover:text-destructive transition-colors"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold gradient-button"
            >
              <LogIn className="w-4 h-4" />
              <span className="hidden sm:inline">Login</span>
            </Link>
          )}
        </div>
      </nav>

      <main className="container py-6 md:py-8">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  );
};

export default AppLayout;
