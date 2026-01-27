import type {
  ChangeEvent,
  ComponentType,
  CSSProperties,
  ElementType,
  ReactElement,
  ReactNode,
  RefObject,
} from 'react';

import type { SvgIconComponent } from '@mui/icons-material';
import type {
  AlertColor,
  ButtonProps as MuiButtonProps,
  PaletteMode,
  SxProps,
  Theme,
} from '@mui/material';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import type {
  MotionProps,
  MotionValue,
  Target,
  Transition,
  UseScrollOptions,
  Variants,
} from 'motion/react';

// Type alias for cleaner RefObject<Element> casting
export type ElementRef = RefObject<Element>;

// --- Provider Types ---
export type Provider = ComponentType<{ children: ReactNode }>;

// --- Icon Type ---
export type IconComponent = ComponentType<SvgIconProps>;

/** Responsive value object - values cascade upward (mobile-first) */
export type ResponsiveValue<T> = {
  xs?: T;
  sm?: T;
  md?: T;
  lg?: T;
  xl?: T;
  fluid?: T;
};

// --- Direction & Navigation Types ---
export type Direction = 'up' | 'down' | null;

export interface NavigationState {
  activeSectionIndex: number;
  activeSectionId: string;
  activeSectionHash: string;
  activeSection: Section;
  totalSections: number;
  direction: Direction;
  isFirst: boolean;
  isLast: boolean;
  isScrollLocked: boolean;
  isPending: boolean;
}

export interface NavigationActions {
  setActiveSection: (indexOrId: number | string) => void;
  navigateTo: (id: string) => void;
  moveNext: () => void;
  movePrev: () => void;
}

// Navigation internal types (from NavigationProvider)
export type NavigationSnapshot = Omit<NavigationState, 'isPending'>;

export type NavigationAction =
  | { type: 'SET_INDEX'; payload: number }
  | { type: 'SET_ID'; payload: string }
  | { type: 'STEP'; payload: 1 | -1 }
  | { type: 'SYNC_HASH'; payload: string };

// --- Config Section Type ---
export interface Section {
  id: string;
  Component: ComponentType;
  title: string;
  hash: string;
  icon?: IconComponent;
  disableScrollLock?: boolean;
}

// --- Constants Types ---
// (None needed for constants themselves, but maybe for their usage)

// --- Feature: About ---
export interface AboutMeItem {
  title: string;
  description: string;
  hasCredential: boolean;
}

export interface AboutMeListProps {
  items: AboutMeItem[];
  onShowModal: () => void;
}

export interface CardItemProps {
  index: number;
  yTransform: MotionValue<number> | number;
  isInView: boolean;
  children: ReactNode;
}

// --- Feature: Projects ---
export interface Project {
  title: string;
  description: string;
  github: string;
  demo?: string;
  npm?: string;
  technologies: string[];
  collaborative: boolean;
  hackathonType?: HackathonType;
  api: boolean;
  isGitpodTemplate?: boolean;
  isNew?: boolean;
  projectBoard?: boolean;
}

export type HackathonType =
  | 'december-2024'
  | 'march-2025'
  | 'november-2024'
  | 'september-2024';

export type ProjectBadgeFlag = HackathonType | 'isGitpodTemplate';

export interface RepoStats {
  stars: number;
  forks: number;
  issues: number;
}

export type ActionButtonProps = Omit<
  CustomButtonProps,
  'startIcon' | 'text'
> & {
  label: string;
  icon: ReactNode;
};

export interface BadgeConfig {
  flag: ProjectBadgeFlag;
  src: string;
  alt: string;
  style?: CSSProperties;
  width?: number;
  height?: number;
}

export interface ProjectListProps {
  project: Project;
}

export interface ProjectHeaderProps {
  project: Project;
}

export interface ProjectTechStackProps {
  technologies: string[];
}

export interface ProjectStatsProps {
  repoPath: string;
  hasProjectBoard: boolean;
}

export type StatKey = keyof RepoStats;

export interface StatItem {
  key: StatKey;
  label: string;
  value: number;
}

export interface ProjectLinksProps {
  project: Project;
}

export interface ProjectMeta {
  repoPath: string | null;
  badges: BadgeConfig[];
  hasProjectBoard: boolean;
}

// --- Components ---
export interface AppThemeProviderProps {
  children: ReactNode;
}

// Card component props (fully flattened for CardComponentProps)
export interface CardComponentProps {
  title?: string | ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  sx?: SxProps<Theme>;
  noContentPadding?: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  motionProps?: MotionProps;
  ref?: React.Ref<HTMLDivElement>;
  animated?: boolean;
}

// CV Modal types (from CvModalContext.ts and CvModalProvider.tsx)
export interface CvModalActions {
  openCvModal: () => void;
  closeCvModal: () => void;
}

export interface CvModalState {
  isCvModalOpen: boolean;
  isPending: boolean;
}

export interface CvModalProviderProps {
  children: ReactNode;
}

export interface BadgeItemProps {
  href: string;
  imgSrc: string;
  date: string;
}

export interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  contentSx?: SxProps<Theme>;
  animationPreset?: 'modal' | 'slideDown' | 'zoomOut';
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  transparentPaper?: boolean;
  maxWidth?: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

export interface CustomButtonProps extends MuiButtonProps {
  text?: string;
  className?: string;
  target?: string;
  ref?: React.Ref<HTMLButtonElement>; // React 19: ref as native prop
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  variant?: 'text' | 'contained' | 'outlined';
  motionWhileTap?: MotionProps['whileTap'];
  motionWhileHover?: MotionProps['whileHover'];
  motionWhileFocus?: MotionProps['whileFocus'];
}

// --- Feature: Hero ---
export interface HeroActionConfig {
  key: string;
  label: ReactNode;
  buttonProps: Partial<CustomButtonProps>;
}

export interface IconBadgeProps {
  icon: ElementType;
  text: string;
}

export interface IconBadgeMetaItem {
  id: string;
  icon: ElementType;
  text: string;
}

export interface IconBadgeListProps {
  items: IconBadgeMetaItem[];
  keyPrefix: string;
}

export interface ImageModalProps {
  open: boolean;
  onClose: () => void;
}

export interface ImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: CSSProperties;
  sx?: SxProps<Theme>;
  onClick?: () => void;
  radius?: 'rounded' | 'circle' | 'flat';
}

export interface ModalCvProps {
  open: boolean;
  onClose: () => void;
}

// --- Global UI Components ---
export interface StatusBannerProps {
  statusBanner: StatusBanner | null;
}

// --- Timeline Components ---
export interface TimelineCardProps {
  title: string;
  metadata: IconBadgeMetaItem[];
  children?: ReactNode;
  dataAttributes?: Record<string, string>;
  metaDataAttribute?: string;
}

export interface TimelineSectionProps {
  children: ReactNode;
  position?: 'left' | 'right' | 'alternate' | 'alternate-reverse';
}

export interface TimelineItemData {
  title: string;
  duration: string;
}

export interface TimelineListProps<T extends TimelineItemData> {
  items: T[];
  renderItem: (item: T, index: number, isMobile: boolean) => React.ReactNode;
  Icon: SvgIconComponent;
  cardMotion: MotionProps;
  getItemIcon?: (item: T) => SvgIconComponent;
}

// --- Theme ---
// Split state for render optimization - read-only state
export interface ThemeModeState {
  mode: PaletteMode;
  isPending: boolean;
}

// Split actions for render optimization - action dispatchers
export interface ThemeModeActions {
  toggleMode: () => void;
  setMode: (
    value: PaletteMode | ((previous: PaletteMode) => PaletteMode)
  ) => void;
}

export type TransitionPreset =
  | 'spring'
  | 'springBouncy'
  | 'springSmooth'
  | 'springVisual'
  | 'springSnappy'
  | 'springGentle'
  | 'smooth'
  | 'easeInOut'
  | 'easeOut'
  | 'slow'
  | 'dramatic'
  | 'anticipate';

export interface AnimationConfig {
  prefersReducedMotion: boolean;
  getDuration: (multiplier?: number) => number;
  getDelay: (steps?: number) => number;
  getStagger: (multiplier?: number) => number;
  getTransition: (
    preset?: TransitionPreset,
    overrides?: Partial<Transition>
  ) => Transition;
  motionViewport: MotionProps['viewport'];
  reducedMotionTarget: MotionProps['initial'];
  resolveMotionState: <T extends MotionProps['initial']>(
    prefersReducedMotion: boolean,
    state?: T,
    fallback?: T
  ) => T;
}

export type AnimationPriority = 'high' | 'reduced';

export type StaggerContainerOptions = {
  exitDirection?: 1 | -1;
  exitStagger?: number;
  initialOpacity?: number;
  animateOpacity?: number;
};

export type CardHoverMotion = {
  variants: Variants;
  initial?: string;
  animate?: string;
  whileHover?: string;
  whileTap?: string;
  whileFocus?: string;
  transition?: Transition;
};

export interface StaggerContainerProps {
  children: ReactNode;
  stagger?: number;
  className?: string;
  style?: CSSProperties;
  sx?: SxProps<Theme>;
}

export interface MagneticWrapperProps {
  children: ReactNode;
  strength?: number;
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
  sx?: SxProps<Theme>;
}

export interface ParallaxProps {
  children: ReactNode;
  offset?: number;
  className?: string;
  style?: CSSProperties;
  sx?: SxProps<Theme>;
}

export interface SectionContainerProps {
  id: string;
  title: ReactNode;
  icon: ElementType;
  children: ReactNode;
  className?: string;
  sx?: SxProps<Theme>;
  headingLevel?: 'h1' | 'h2' | 'h3' | 'h4';
  subtitle?: ReactNode;
  headerActions?: ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false;
}

export interface ExtendedErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

// --- Feature: Experience ---
export interface Experience {
  type: 'work' | 'education';
  title: string;
  workplace?: string;
  school?: string;
  duration: string;
  description: string[];
  hasCredential?: boolean;
}

// WorkExperience component types
export interface WorkExperienceCardProps extends BaseCardProps {
  onShowModal: () => void;
}

// WorkExperience component types
export interface TimelineCardWrapperProps {
  experience: Experience;
  showDuration: boolean;
  children: React.ReactNode;
  cardRef: React.RefObject<HTMLDivElement | null>;
}

export interface BaseCardProps {
  experience: Experience;
  showDuration?: boolean;
}

export interface EducationCardProps extends BaseCardProps {
  onShowModal: () => void;
}

// --- Feature: Education ---
export interface CredentialProps {
  open: boolean;
  onClose: () => void;
}

// --- Feature: Contact ---
export interface ContactFormValues {
  name: string;
  email: string;
  company: string;
  url: string;
  message: string;
}

export type ContactFieldKey = keyof ContactFormValues;

export type ContactErrorKey = Exclude<ContactFieldKey, 'company'>;

export type ContactFormErrors = Partial<Record<ContactErrorKey, string>>;

export interface ContactFieldConfig {
  key: ContactFieldKey;
  controlId: string;
  icon: ElementType;
  type?: FormFieldProps['type'];
  label: string;
  placeholder: string;
  required?: boolean;
  minRows?: number;
  maxRows?: number;
  errorKey?: ContactErrorKey;
  gridProps?: { xs?: number; md?: number };
}

export interface SuccessIndicatorProps {
  visible: boolean;
}

export interface FormActionsProps {
  onReset: () => void;
  isPending: boolean;
}

export interface FormFieldProps {
  controlId: string;
  icon: ElementType;
  type?: 'text' | 'email' | 'url' | 'textarea';
  name: string;
  label?: string;
  placeholder: string;
  defaultValue?: string;
  error?: string;
  required?: boolean;
  minRows?: number;
  maxRows?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

export interface FormFieldsProps {
  errors: ContactFormErrors;
  disabled?: boolean;
}

// --- Feature: Skills ---
export interface Skill {
  icon: IconComponent;
  label: string;
  learning?: boolean;
}

export interface SkillBadgeProps {
  skill: Skill;
}

// --- Navigation ---
export interface NavLink {
  id: string;
  icon: IconComponent;
  label: string;
}

export interface NavLinkItemProps {
  id: string;
  icon: IconComponent;
  label: string;
  isActive: boolean;
  isPending: boolean;
  onClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
  showHighlight: boolean;
  highlightTransition: Transition;
}

export interface SocialLink {
  id: string;
  icon: IconComponent;
  href?: string;
  onClick?: () => void;
  tooltip: string;
  color?: string;
  iconColor?: string;
}

export interface SocialLinkRenderProps {
  href?: string;
  onClick?: () => void;
  tooltip: string;
  icon: ReactNode;
  bgColor?: string;
  iconColor?: string;
  index: number;
}

export interface SocialLinkListProps {
  openModal: () => void;
  renderLink: (props: SocialLinkRenderProps) => ReactElement;
  wrapItem?: (id: string, node: ReactElement) => ReactElement;
  iconSize?: string | number | { xs?: string | number; sm?: string | number };
}

export interface OffcanvasMenuProps {
  showOffcanvas: boolean;
  closeOffcanvas: () => void;
  openOffcanvas: () => void;
  openModal: () => void;
}

// --- Snackbar Context ---
// Split state for render optimization
export interface SnackbarState {
  open: boolean;
  message: string;
  severity: AlertColor;
}

// Split actions for render optimization
export interface SnackbarActions {
  showSnackbar: (
    message: string,
    severity?: AlertColor,
    duration?: number | null
  ) => void;
  closeSnackbar: () => void;
}

// Combined type for backwards compatibility
export interface SnackbarContextType extends SnackbarState, SnackbarActions {}

// Snackbar reducer types (from SnackbarProvider.tsx)
export interface SnackbarReducerState {
  open: boolean;
  message: string;
  severity: AlertColor;
  duration: number | null;
}

export type SnackbarAction =
  | { type: 'SHOW'; payload: Omit<SnackbarReducerState, 'open'> }
  | { type: 'CLOSE' };

// --- Hooks ---
export type CopyResult = {
  value: string | null;
  success: boolean | null;
};

export type CopyFn = (text: string) => Promise<boolean>;

export type UseCopyToClipboardReturn = [CopyFn, CopyResult];

export interface MagnetMotionProps {
  style?: MotionProps['style'];
  onPointerMove?: React.PointerEventHandler<HTMLDivElement>;
  onPointerLeave?: React.PointerEventHandler<HTMLDivElement>;
}

export interface UseToggleReturn {
  value: boolean;
  toggle: (nextValue?: boolean) => void;
  setTrue: () => void;
  setFalse: () => void;
}

// Hook return types (from hooks files)
export interface UseImageLoadingReturn {
  isLoaded: boolean;
  handleLoad: () => void;
  handleError: () => void;
  reset: () => void;
}

export interface UseModalReturn {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

// Motion hook types (from useMotions.ts)
export type SectionSequenceStep = {
  selector: string;
  delay: number;
  useStagger: boolean;
  staggerValue?: number;
};

export interface TimelineSectionControllerOptions {
  viewportPreset?: { once?: boolean; amount?: number | 'some' | 'all' };
  selectors: {
    cards?: string;
    description?: string;
    cta?: string;
    [key: string]: string | undefined;
  };
  sequenceOptions?: {
    offset?: UseScrollOptions['offset'];
    threshold?: number;
  };
  variants?: Variants;
  hoverEffect?: Target | string;
  initialState?: string;
  visibleState?: string;
  hiddenState?: string;
}

// --- Scroll & Navigation Hooks ---
export type ScrollDirection = 'up' | 'down';

export interface UseScrollEventsProps {
  onNavigate: (direction: ScrollDirection) => boolean;
  shouldDisable: boolean; // Disables ALL event listeners (touch, wheel, keyboard)
  disableNonTouchInputs?: boolean; // Only disables wheel and keyboard, keeps touch active
  isScrolling: React.RefObject<boolean>;
}

// --- Utils ---
export type ValidationError = string | undefined;

export type StatusBanner = {
  message: string;
  severity: AlertColor;
  persistent: boolean;
};

// Metadata utility types (from utils/metadata.ts)
export type MetaType = 'workplace' | 'school' | 'duration';
export type MetaValue = string | null | undefined;

// Motion props utility types (from utils/motionProps.ts)
export type ConflictingEvent =
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onDragOver'
  | 'onDragEnter'
  | 'onDragLeave'
  | 'onDrop'
  | 'onAnimationStart'
  | 'onAnimationEnd'
  | 'onAnimationIteration';

// Validation utility types (from utils/validation.ts)
export interface ValidatorConfig {
  required?: string;
  pattern?: { regex: RegExp; error: string };
  minLength?: { value: number; error: string };
  optional?: boolean;
}

// --- Theme Module Augmentation ---
declare module '@mui/material/styles' {
  interface Mixins {
    // Glassmorphism effect mixin (backdrop-filter + webkit-backdrop-filter)
    glass: CSSProperties;
    // Heavy glassmorphism effect (stronger blur)
    glassHeavy: CSSProperties;
    // Light glassmorphism effect (subtle blur)
    glassLight: CSSProperties;
  }
  interface MixinsOptions {
    glass?: CSSProperties;
    glassHeavy?: CSSProperties;
    glassLight?: CSSProperties;
  }

  interface Theme {
    vars: Theme;
  }

  interface Palette {
    // Gradient used for Hero section background
    heroGradient: string;
    // Neutral color palette for secondary UI elements
    neutral: Palette['primary'];
    // Backdrop colors, including glass effect base color
    backdrop: {
      glass: string;
    };
    // Brand color for Certificate badges/buttons
    certificate: Palette['primary'];
    // Brand color for GitHub badges/buttons
    github: Palette['primary'];
    // Brand color for LinkedIn badges/buttons
    linkedin: Palette['primary'];
    // Brand color for PDF/Resume badges/buttons
    pdf: Palette['primary'];
    // Brand color for Source Code badges/buttons
    sourceCode: Palette['primary'];
  }
  interface PaletteOptions {
    heroGradient?: string;
    neutral?: PaletteOptions['primary'];
    backdrop?: {
      glass?: string;
    };
    certificate?: PaletteOptions['primary'];
    github?: PaletteOptions['primary'];
    linkedin?: PaletteOptions['primary'];
    pdf?: PaletteOptions['primary'];
    sourceCode?: PaletteOptions['primary'];
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
    certificate: true;
    github: true;
    linkedin: true;
    pdf: true;
    sourceCode: true;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsVariantOverrides {
    soft: true;
    gradient: true;
  }
}
