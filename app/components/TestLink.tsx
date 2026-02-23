import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps,
} from "react-router";
import { tv } from "tailwind-variants";
import { focusRing } from "~/lib/react-aria-utils";

interface TestLinkProps extends RouterLinkProps {
  variant?: "primary" | "secondary";
}

const styles = tv({
  extend: focusRing,
  base: "underline disabled:no-underline disabled:cursor-default forced-colors:disabled:text-[GrayText] transition rounded-xs [-webkit-tap-highlight-color:transparent]",
  variants: {
    variant: {
      primary:
        "text-blue-600 dark:text-blue-500 underline decoration-blue-600/60 hover:decoration-blue-600 dark:decoration-blue-500/60 dark:hover:decoration-blue-500",
      secondary:
        "text-neutral-700 dark:text-neutral-300 underline decoration-neutral-700/50 hover:decoration-neutral-700 dark:decoration-neutral-300/70 dark:hover:decoration-neutral-300",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

/**
 * TestLink - A navigation link component that combines React Router's client-side
 * routing with consistent UI styling.
 *
 * Use this for internal navigation within your app (e.g., /login, /dashboard).
 * Use the regular Link component from ~/components/ui/Link for external links.
 *
 * @example
 * ```tsx
 * <TestLink to="/login">Sign in</TestLink>
 * <TestLink to="/register" variant="secondary">Sign up</TestLink>
 * ```
 */
export function TestLink({
  variant = "primary",
  className,
  ...props
}: TestLinkProps) {
  return (
    <RouterLink
      {...props}
      className={typeof className === 'string'
        ? styles({ variant, className })
        : styles({ variant })}
    />
  );
}
