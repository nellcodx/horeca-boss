import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const AuthCard = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!email.trim()) errs.email = "Email обов'язковий";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = "Некоректний email";
    if (!password) errs.password = "Пароль обов'язковий";
    else if (password.length < 6) errs.password = "Мінімум 6 символів";
    if (isSignUp && password !== confirmPassword) errs.confirm = "Паролі не співпадають";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      // TODO: підключити Lovable Cloud для реальної авторизації
      await new Promise(r => setTimeout(r, 800));
      if (isSignUp) {
        toast({
          title: "Реєстрація успішна!",
          description: "Перевірте вашу пошту для підтвердження.",
        });
      } else {
        toast({ title: "Ви увійшли!", description: "Ласкаво просимо." });
        navigate("/staff", { replace: true });
      }
    } catch (error: any) {
      toast({
        title: "Помилка",
        description: error.message || "Щось пішло не так",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-[420px] mx-auto">
      <div className="relative rounded-2xl overflow-hidden shadow-[20px_20px_60px_hsl(0_0%_75%/0.3),_-20px_-20px_60px_hsl(0_0%_100%/0.3)]">
        <div className="absolute inset-0 z-0">
          <div
            className="absolute z-[1] top-1/2 left-1/2 w-[180px] h-[180px] rounded-full bg-primary opacity-70 blur-[40px] animate-blob-bounce"
          />
        </div>
        <div className="relative z-[2] m-[5px] rounded-xl bg-card/95 backdrop-blur-[24px] border-2 border-card p-8 sm:p-10">
          {/* Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span
              className={`text-sm font-semibold cursor-pointer transition-colors ${
                !isSignUp ? "text-primary underline underline-offset-4" : "text-muted-foreground"
              }`}
              onClick={() => setIsSignUp(false)}
            >
              Увійти
            </span>
            
            <div
              className="relative w-[56px] h-[28px] cursor-pointer"
              onClick={() => setIsSignUp(!isSignUp)}
            >
              <div className="absolute inset-0 rounded-full bg-foreground/10 border-2 border-border transition-colors" />
              <div
                className={`absolute top-[3px] w-[20px] h-[20px] rounded-full bg-primary shadow-md transition-all duration-300 ${
                  isSignUp ? "left-[32px]" : "left-[3px]"
                }`}
              />
            </div>

            <span
              className={`text-sm font-semibold cursor-pointer transition-colors ${
                isSignUp ? "text-primary underline underline-offset-4" : "text-muted-foreground"
              }`}
              onClick={() => setIsSignUp(true)}
            >
              Реєстрація
            </span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-center text-foreground mb-6">
            {isSignUp ? "Створити акаунт" : "Ласкаво просимо"}
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full h-12 rounded-lg border-2 bg-background px-4 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all duration-200 focus:border-primary focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.15)] ${
                  errors.email ? "border-destructive" : "border-border"
                }`}
              />
              {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
            </div>

            <div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`w-full h-12 rounded-lg border-2 bg-background px-4 pr-12 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all duration-200 focus:border-primary focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.15)] ${
                    errors.password ? "border-destructive" : "border-border"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-destructive">{errors.password}</p>}
            </div>

            {isSignUp && (
              <div>
                <div className="relative">
                  <input
                    type={showConfirm ? "text" : "password"}
                    placeholder="Підтвердіть пароль"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className={`w-full h-12 rounded-lg border-2 bg-background px-4 pr-12 text-sm text-foreground placeholder:text-muted-foreground outline-none transition-all duration-200 focus:border-primary focus:shadow-[0_0_0_3px_hsl(var(--primary)/0.15)] ${
                      errors.confirm ? "border-destructive" : "border-border"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirm && <p className="mt-1 text-xs text-destructive">{errors.confirm}</p>}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative border-none bg-transparent p-0 cursor-pointer outline-offset-4 mt-4 select-none touch-manipulation w-full disabled:opacity-60"
            >
              <span className="absolute top-0 left-0 w-full h-full rounded-xl bg-foreground/25 translate-y-[2px] transition-transform duration-[600ms] ease-[cubic-bezier(.3,.7,.4,1)] group-hover:translate-y-[4px] group-active:translate-y-[1px]" />
              <span className="absolute top-0 left-0 w-full h-full rounded-xl bg-gradient-to-l from-[hsl(348,83%,30%)] via-[hsl(348,83%,40%)] to-[hsl(348,83%,30%)]" />
              <span className="block relative rounded-xl px-7 py-3 bg-primary text-primary-foreground font-semibold text-base -translate-y-1 transition-transform duration-[600ms] ease-[cubic-bezier(.3,.7,.4,1)] group-hover:-translate-y-1.5 group-active:-translate-y-0.5">
                {loading ? "Зачекайте..." : isSignUp ? "Зареєструватися" : "Увійти"}
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthCard;
