import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Crown, Mail, Lock, User, ArrowRight, Eye, EyeOff, Sparkles, Check, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const PASSWORD_RULES = [
  { label: "8+ characters", test: (p: string) => p.length >= 8 },
  { label: "Uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  { label: "Lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { label: "Number", test: (p: string) => /\d/.test(p) },
  { label: "Special character", test: (p: string) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
];

const SignupPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; password?: string }>({});
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const passedRules = useMemo(() => PASSWORD_RULES.map((r) => r.test(password)), [password]);
  const allRulesPassed = passedRules.every(Boolean);
  const strength = passedRules.filter(Boolean).length;
  const strengthPct = (strength / PASSWORD_RULES.length) * 100;
  const strengthColor = strengthPct <= 40 ? "bg-destructive" : strengthPct <= 60 ? "bg-amber-500" : strengthPct <= 80 ? "bg-accent" : "bg-neon-green";

  const validate = () => {
    const e: typeof errors = {};
    if (!name.trim()) e.name = "Name is required";
    if (!email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email = "Invalid email format";
    if (!allRulesPassed) e.password = "Password doesn't meet all requirements";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    const { error } = await signUp(email, password, name);
    setIsLoading(false);
    if (error) {
      toast({ title: "Signup failed", description: error, variant: "destructive" });
    } else {
      toast({ title: "Account created! 🎉", description: "You're now signed in." });
      navigate("/");
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="glass-card p-8 w-full max-w-md relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/10 via-transparent to-primary/10" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-neon-blue via-primary to-neon-pink rounded-b-full" />
        <div className="relative z-10">
          <div className="text-center mb-8">
            <motion.div animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              <Crown className="w-14 h-14 text-accent mx-auto mb-3 drop-shadow-[0_0_15px_hsl(var(--accent)/0.5)]" fill="currentColor" />
            </motion.div>
            <h1 className="font-display text-2xl font-bold text-gradient-primary">Create Account</h1>
            <p className="text-sm text-muted-foreground mt-1 flex items-center justify-center gap-1">
              <Sparkles className="w-3 h-3 text-neon-pink" /> Join the Queen Game
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-display tracking-wider text-muted-foreground">Name</label>
              <div className="relative mt-1">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="text" value={name} onChange={(e) => { setName(e.target.value); setErrors(p => ({ ...p, name: undefined })); }}
                  className={`w-full bg-secondary/80 border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${errors.name ? "border-destructive focus:ring-destructive/20" : "border-border focus:border-primary focus:ring-primary/20"}`}
                  placeholder="Your name" />
              </div>
              {errors.name && <p className="text-xs text-destructive mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="text-xs font-display tracking-wider text-muted-foreground">Email</label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrors(p => ({ ...p, email: undefined })); }}
                  className={`w-full bg-secondary/80 border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${errors.email ? "border-destructive focus:ring-destructive/20" : "border-border focus:border-primary focus:ring-primary/20"}`}
                  placeholder="you@example.com" />
              </div>
              {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
            </div>

            <div>
              <label className="text-xs font-display tracking-wider text-muted-foreground">Password</label>
              <div className="relative mt-1">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input type={showPassword ? "text" : "password"} value={password}
                  onChange={(e) => { setPassword(e.target.value); setErrors(p => ({ ...p, password: undefined })); }}
                  className={`w-full bg-secondary/80 border rounded-xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${errors.password ? "border-destructive focus:ring-destructive/20" : "border-border focus:border-primary focus:ring-primary/20"}`}
                  placeholder="••••••••" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {/* Strength bar */}
              {password.length > 0 && (
                <div className="mt-2 space-y-2">
                  <div className="h-1.5 bg-border rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${strengthColor}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${strengthPct}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {PASSWORD_RULES.map((rule, i) => (
                      <div key={rule.label} className={`flex items-center gap-1 text-[10px] ${passedRules[i] ? "text-neon-green" : "text-muted-foreground"}`}>
                        {passedRules[i] ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
                        {rule.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button type="submit" disabled={isLoading}
              className="w-full gradient-button py-3 flex items-center justify-center gap-2 disabled:opacity-50">
              {isLoading ? (
                <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
              ) : (
                <>Create Account <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:text-neon-pink transition-colors font-semibold">Sign In</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
