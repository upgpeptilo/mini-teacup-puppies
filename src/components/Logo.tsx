interface LogoProps {
  className?: string;
  /** When false, only the badge mark is rendered (no wordmark). */
  withText?: boolean;
  /** Use light colours for placement on dark backgrounds (e.g. the footer). */
  variant?: 'dark' | 'light';
}

/**
 * Original, custom-drawn dog-head badge + wordmark. Inline SVG so it stays
 * crisp at any size and can recolour for light/dark backgrounds.
 */
export default function Logo({ className, withText = true, variant = 'dark' }: LogoProps) {
  const titleColor = variant === 'light' ? '#ffffff' : '#753347';
  return (
    <span className={`inline-flex items-center gap-3 ${className ?? ''}`}>
      <svg viewBox="0 0 64 64" className="h-10 w-10 shrink-0" aria-hidden="true" focusable="false">
        <defs>
          <linearGradient id="logo-badge" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#cc6a8a" />
            <stop offset="1" stopColor="#753347" />
          </linearGradient>
        </defs>
        <rect width="64" height="64" rx="16" fill="url(#logo-badge)" />
        <g fill="#fdf6f0">
          <path d="M19 14c-4 0-6 4-5 9 .6 3 2.4 5 4.2 5.6C17.6 24.8 18 20 21 17c-.6-1.8-1.4-3-2-3z" />
          <path d="M45 14c4 0 6 4 5 9-.6 3-2.4 5-4.2 5.6C43.4 24.8 43 20 40 17c.6-1.8 1.4-3 2-3z" />
          <path d="M32 20c-8 0-13 6.5-13 14 0 7.5 5.8 13 13 13s13-5.5 13-13c0-7.5-5-14-13-14z" />
        </g>
        <g fill="#753347">
          <ellipse cx="26" cy="33" rx="2.4" ry="3" />
          <ellipse cx="38" cy="33" rx="2.4" ry="3" />
        </g>
        <path d="M32 38l-2.4 2.2h4.8z" fill="#d95468" />
        <path
          d="M32 41c-1.8 1.8-3.8 1.4-4.8 0M32 41c1.8 1.8 3.8 1.4 4.8 0"
          fill="none"
          stroke="#753347"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
      {withText && (
        <span className="flex flex-col leading-none">
          <span className="font-heading text-lg font-extrabold tracking-tight" style={{ color: titleColor }}>
            MINI TEACUP
          </span>
          <span className="font-heading text-xs font-semibold tracking-[0.2em] text-ember">PUPPIES 4 HOMES</span>
        </span>
      )}
    </span>
  );
}
