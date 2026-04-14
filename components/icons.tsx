import type { ReactNode, SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({
  children,
  viewBox = '0 0 24 24',
  ...props
}: IconProps & { children: ReactNode; viewBox?: string }) {
  return (
    <svg
      viewBox={viewBox}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2.5" />
      <path d="M8 2.75V6.5" />
      <path d="M16 2.75V6.5" />
      <path d="M3 10.5H21" />
    </IconBase>
  );
}

export function DownloadIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3V14" />
      <path d="M7 10L12 15L17 10" />
      <path d="M4 19H20" />
    </IconBase>
  );
}

export function BellIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M18 8.5A6 6 0 0 0 6 8.5C6 15.5 3 17.5 3 17.5H21S18 15.5 18 8.5Z" />
      <path d="M10 20.5A2.2 2.2 0 0 0 14 20.5" />
    </IconBase>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6 9L12 15L18 9" />
    </IconBase>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M5 12.5L9.5 17L19 7.5" />
    </IconBase>
  );
}

export function AlertCircleIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8V12.5" />
      <circle cx="12" cy="16.5" r="0.6" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function GlobeIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12H21" />
      <path d="M12 3C14.5 5.4 16 8.6 16 12C16 15.4 14.5 18.6 12 21" />
      <path d="M12 3C9.5 5.4 8 8.6 8 12C8 15.4 9.5 18.6 12 21" />
    </IconBase>
  );
}

export function MonitorIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="4" width="18" height="13" rx="2.5" />
      <path d="M9 20H15" />
      <path d="M12 17V20" />
    </IconBase>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5V5" />
      <path d="M12 19V21.5" />
      <path d="M4.9 4.9L6.7 6.7" />
      <path d="M17.3 17.3L19.1 19.1" />
      <path d="M2.5 12H5" />
      <path d="M19 12H21.5" />
      <path d="M4.9 19.1L6.7 17.3" />
      <path d="M17.3 6.7L19.1 4.9" />
    </IconBase>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M18.5 14.6A7.8 7.8 0 0 1 9.4 5.5A8.6 8.6 0 1 0 18.5 14.6Z" />
    </IconBase>
  );
}

export function MusicNoteIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M14 4V14.5" />
      <path d="M14 6L19 4.5V15" />
      <circle cx="9" cy="16" r="2.5" />
      <circle cx="19" cy="17" r="2.5" />
    </IconBase>
  );
}

export function PlayIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M8 6.5V17.5L18 12L8 6.5Z" fill="currentColor" stroke="none" />
    </IconBase>
  );
}

export function PauseIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M8 6.5V17.5" />
      <path d="M16 6.5V17.5" />
    </IconBase>
  );
}

export function Volume2Icon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 10H7.5L12 6V18L7.5 14H4V10Z" />
      <path d="M16 8.5C17.5 9.4 18.5 10.9 18.5 12.5C18.5 14.1 17.5 15.6 16 16.5" />
      <path d="M18.5 5.5C20.8 7.1 22 9.7 22 12.5C22 15.3 20.8 17.9 18.5 19.5" />
    </IconBase>
  );
}

export function VolumeXIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M4 10H7.5L12 6V18L7.5 14H4V10Z" />
      <path d="M16.5 9.5L21 14" />
      <path d="M21 9.5L16.5 14" />
    </IconBase>
  );
}

export function SparklesIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3L13.9 8.1L19 10L13.9 11.9L12 17L10.1 11.9L5 10L10.1 8.1L12 3Z" />
      <path d="M5 18L5.8 20.2L8 21L5.8 21.8L5 24L4.2 21.8L2 21L4.2 20.2L5 18Z" />
    </IconBase>
  );
}

export function StarIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 3L14.7 9.3L21 12L14.7 14.7L12 21L9.3 14.7L3 12L9.3 9.3L12 3Z" />
    </IconBase>
  );
}

export function HeartIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M12 20C4.7 15.5 3 12.6 3 9.5A4.5 4.5 0 0 1 12 7A4.5 4.5 0 0 1 21 9.5C21 12.6 19.3 15.5 12 20Z" />
    </IconBase>
  );
}

export function ImageIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="4" width="18" height="16" rx="2.5" />
      <circle cx="9" cy="10" r="1.5" />
      <path d="M6 17L11 12L14.5 15.5L17 13L21 17" />
    </IconBase>
  );
}

export function VideoIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="6" width="13" height="12" rx="2.5" />
      <path d="M16 10L21 7.5V16.5L16 14" />
    </IconBase>
  );
}

export function ExpandIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M8 3H3V8" />
      <path d="M16 3H21V8" />
      <path d="M8 21H3V16" />
      <path d="M16 21H21V16" />
      <path d="M8 3L3 8" />
      <path d="M16 3L21 8" />
      <path d="M8 21L3 16" />
      <path d="M16 21L21 16" />
    </IconBase>
  );
}

export function XIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M6 6L18 18" />
      <path d="M18 6L6 18" />
    </IconBase>
  );
}

export function MailIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="M4 7L12 13L20 7" />
    </IconBase>
  );
}

export function CheckCircleIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12L10.8 14.8L16.5 9.2" />
    </IconBase>
  );
}
