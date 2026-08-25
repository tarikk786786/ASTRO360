import React, { forwardRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, X, ChevronDown, Check } from 'lucide-react';

/* ─────────────────────────────────────────────────────────────
 * 1. AstroButton
 * ──────────────────────────────────────────────────────────── */
export interface AstroButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline' | 'gold' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const AstroButton = forwardRef<HTMLButtonElement, AstroButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  ...props
}, ref) => {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-xl min-h-[36px]',
    md: 'px-4 py-2 text-xs sm:text-sm rounded-xl min-h-[44px]',
    lg: 'px-6 py-3.5 text-sm sm:text-base rounded-2xl min-h-[48px]',
  }[size];

  const variantClasses = {
    primary: 'bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold shadow-lg shadow-amber-400/20 active:scale-[0.98]',
    secondary: 'bg-[#0F172A] hover:bg-[#131F37] text-white border border-white/10 hover:border-white/20',
    gold: 'bg-gradient-to-r from-amber-400 via-amber-300 to-amber-400 text-slate-950 font-black shadow-lg shadow-amber-400/25 active:scale-[0.98]',
    outline: 'bg-transparent text-slate-300 hover:text-white border border-white/15 hover:border-white/30',
    ghost: 'bg-transparent hover:bg-white/5 text-slate-300 hover:text-white',
    danger: 'bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30',
  }[variant];

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={`inline-flex items-center justify-center gap-2 font-mono transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {isLoading ? (
        <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
      ) : (
        <>
          {leftIcon}
          <span>{children}</span>
          {rightIcon}
        </>
      )}
    </button>
  );
});
AstroButton.displayName = 'AstroButton';

/* ─────────────────────────────────────────────────────────────
 * 2. AstroCard
 * ──────────────────────────────────────────────────────────── */
export interface AstroCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'glass' | 'goldGlow' | 'interactive';
}

export const AstroCard = forwardRef<HTMLDivElement, AstroCardProps>(({
  children,
  variant = 'default',
  className = '',
  ...props
}, ref) => {
  const variantClasses = {
    default: 'bg-[#0B1220] border border-white/10 shadow-xl',
    elevated: 'bg-[#0F172A] border border-white/15 shadow-2xl',
    glass: 'bg-[#060A12]/80 backdrop-blur-xl border border-white/10',
    goldGlow: 'bg-[#0B1220] border border-amber-400/30 shadow-[0_0_30px_-5px_rgba(251,191,36,0.15)]',
    interactive: 'bg-[#0B1220] border border-white/10 hover:border-amber-400/40 hover:bg-[#0E1729] cursor-pointer transition-all duration-200 shadow-lg',
  }[variant];

  return (
    <div
      ref={ref}
      className={`rounded-3xl p-5 sm:p-6 text-left relative overflow-hidden ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});
AstroCard.displayName = 'AstroCard';

/* ─────────────────────────────────────────────────────────────
 * 3. AstroBadge
 * ──────────────────────────────────────────────────────────── */
export interface AstroBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'gold' | 'cyan' | 'emerald' | 'purple' | 'neutral' | 'rose';
  icon?: React.ReactNode;
}

export const AstroBadge: React.FC<AstroBadgeProps> = ({
  children,
  variant = 'gold',
  icon,
  className = '',
  ...props
}) => {
  const variantClasses = {
    gold: 'bg-amber-400/10 text-amber-300 border-amber-400/30',
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/30',
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/30',
    neutral: 'bg-white/5 text-slate-300 border-white/10',
    rose: 'bg-rose-500/10 text-rose-300 border-rose-500/30',
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider border ${variantClasses} ${className}`}
      {...props}
    >
      {icon}
      <span>{children}</span>
    </span>
  );
};

/* ─────────────────────────────────────────────────────────────
 * 4. AstroSheet (Accessible Drawer / Bottom Sheet)
 * ──────────────────────────────────────────────────────────── */
export interface AstroSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}

export const AstroSheet: React.FC<AstroSheetProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%', opacity: 0.5 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="relative z-10 w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-t-3xl md:rounded-3xl bg-[#090E1A] border border-white/15 p-6 shadow-2xl space-y-4 text-left"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">{title}</h3>
                {subtitle && <p className="text-xs text-slate-400 font-mono pt-0.5">{subtitle}</p>}
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white cursor-pointer transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="py-2 text-slate-300 font-sans text-xs sm:text-sm leading-relaxed space-y-4">
              {children}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

/* ─────────────────────────────────────────────────────────────
 * 5. AstroTabs
 * ──────────────────────────────────────────────────────────── */
export interface AstroTabsProps {
  tabs: { id: string; label: string; icon?: React.ReactNode }[];
  activeTab: string;
  onChange: (id: string) => void;
}

export const AstroTabs: React.FC<AstroTabsProps> = ({ tabs, activeTab, onChange }) => {
  return (
    <div className="flex items-center gap-1.5 overflow-x-auto p-1 rounded-2xl bg-[#060A12] border border-white/10 no-scrollbar">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold shrink-0 transition-all cursor-pointer ${
              isActive
                ? 'bg-amber-400 text-slate-950 shadow-md'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};

/* ─────────────────────────────────────────────────────────────
 * 6. AstroInput
 * ──────────────────────────────────────────────────────────── */
export interface AstroInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const AstroInput = forwardRef<HTMLInputElement, AstroInputProps>(({
  label,
  error,
  className = '',
  ...props
}, ref) => {
  return (
    <div className="space-y-1 text-left w-full">
      {label && <label className="text-[11px] font-mono font-bold uppercase text-slate-400 block">{label}</label>}
      <input
        ref={ref}
        className={`w-full bg-[#0F172A] border border-white/15 rounded-xl px-3.5 py-2.5 text-xs font-mono text-white placeholder:text-slate-500 focus:border-amber-400 focus:ring-1 focus:ring-amber-400 outline-none transition-all ${error ? 'border-rose-500' : ''} ${className}`}
        {...props}
      />
      {error && <span className="text-[10px] font-mono text-rose-400 block">{error}</span>}
    </div>
  );
});
AstroInput.displayName = 'AstroInput';

/* ─────────────────────────────────────────────────────────────
 * 7. AstroSkeleton
 * ──────────────────────────────────────────────────────────── */
export const AstroSkeleton: React.FC<{ className?: string }> = ({ className = 'h-4 w-full' }) => {
  return (
    <div className={`rounded-xl bg-white/5 animate-pulse ${className}`} />
  );
};
