import {
  Loader2,
  LucideProps,
  Moon,
  SunMedium,
  Twitter,
  Github,
  type Icon as LucideIcon,
} from "lucide-react"

export type Icon = typeof LucideIcon

export const Icons = {
  sun: SunMedium,
  moon: Moon,
  twitter: Twitter,
  spinner: Loader2,
  github: Github,
  google: ({ ...props }: LucideProps) => (
    <svg
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="google"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 488 512"
      {...props}
    >
      <path
        fill="currentColor"
        d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
      ></path>
    </svg>
  ),
  aws: ({ ...props }: LucideProps) => (
    <svg {...props} viewBox="0 0 24 24">
      <path fill="currentColor" d="M18.75 11.35a4.32 4.32 0 0 1-.79-.08 3.9 3.9 0 0 1-.73-.23l-.17-.04a3 3 0 0 0-.63-.13 3.84 3.84 0 0 0-.7.06 3.94 3.94 0 0 0-1.75.82c-.74.57-1.17 1.32-1.17 2.07a2.22 2.22 0 0 0 .53 1.43 2.56 2.56 0 0 0 1.95.82 3.06 3.06 0 0 0 2.15-.88 2.94 2.94 0 0 0 .89-2.13zm-8.37.23a2.8 2.8 0 0 0-1.41.36 1.85 1.85 0 0 0-.85 1.02 2.76 2.76 0 0 0-.12.84v.34a.75.75 0 0 1-.37.64 1.8 1.8 0 0 1-.88.22H6.6a.75.75 0 0 1-.75-.75V8.36a.75.75 0 0 1 .75-.75h.15a.75.75 0 0 1 .75.75v.85a3.71 3.71 0 0 1 2.8-1.13 3.96 3.96 0 0 1 2.91 1.22 4.05 4.05 0 0 1 1.19 2.93 4.1 4.1 0 0 1-1.19 2.94 3.94 3.94 0 0 1-2.91 1.22z"/>
    </svg>
  ),
  azure: ({ ...props }: LucideProps) => (
    <svg {...props} viewBox="0 0 24 24">
      <path fill="currentColor" d="M5.483 21.3H24L14.025 4.013l-3.038 8.347 5.836 6.938L5.483 21.3zM13.23 2.7L6.105 8.677 0 19.253h5.505v.014L13.23 2.7z"/>
    </svg>
  ),
} 