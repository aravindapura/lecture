import * as React from "react";

import { cn } from "@/lib/utils";

const variants = {
  default: "bg-white text-slate-950 shadow-glow hover:-translate-y-0.5 hover:bg-cyan-100",
  glass:
    "border border-white/[0.12] bg-white/[0.06] text-white backdrop-blur-xl hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-white/[0.1]",
  neon:
    "bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-400 text-slate-950 shadow-[0_0_44px_rgba(34,211,238,0.35)] hover:-translate-y-0.5 hover:shadow-[0_0_70px_rgba(59,130,246,0.42)]",
};

const sizes = {
  default: "h-11 px-6 py-2",
  lg: "h-14 px-8 py-4 text-base",
  sm: "h-9 px-4",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  asChild?: boolean;
  href?: string;
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  target?: string;
  rel?: string;
};

const baseClass =
  "inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 disabled:pointer-events-none disabled:opacity-50";

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", asChild = false, children, href, target, rel, ...props }, ref) => {
    const computedClassName = cn(baseClass, variants[variant], sizes[size], className);

    if (asChild && React.isValidElement<{ className?: string }>(children)) {
      return React.cloneElement(children, {
        className: cn(computedClassName, children.props.className),
      });
    }

    if (asChild && href) {
      return (
        <a className={computedClassName} href={href} target={target} rel={rel}>
          {children}
        </a>
      );
    }

    return (
      <button className={computedClassName} ref={ref} {...props}>
        {children}
      </button>
    );
  },
);
Button.displayName = "Button";

export { Button };
