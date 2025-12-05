import {
  ChangeEvent,
  ComponentType,
  CSSProperties,
  ElementType,
  ReactElement,
  ReactNode,
  RefObject,
} from 'react';

import type { SvgIconComponent } from '@mui/icons-material';
import {
  AlertColor,
  ButtonProps as MuiButtonProps,
  PaletteMode,
  SxProps,
  Theme,
} from '@mui/material';
import type { Breakpoint } from '@mui/material/styles';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import type {
  AnimationOptions,
  AnimationPlaybackControls,
  DOMKeyframesDefinition,
  ElementOrSelector,
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

// --- Responsive Types (from responsive.ts) ---
export type BreakpointKey = Breakpoint;

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

export type NavigationContextType = NavigationState & NavigationActions;

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
export type HackathonType =
  | 'december-2024'
  | 'march-2025'
  | 'november-2024'
  | 'september-2024';

export interface Project {
  title: string;
  description: string;
  github: string;
  demo: string;
  technologies: string[];
  collaborative: boolean;
  hackathonType?: HackathonType;
  api: boolean;
  isGitpodTemplate?: boolean;
  isNew?: boolean;
  projectBoard?: boolean;
}

export interface RepoStats {
  stars: number;
  forks: number;
  issues: number;
}

export interface CachedStats {
  data: RepoStats;
  timestamp: number;
}

export interface AnimatedStatProps {
  label: string;
  value: number;
  prefersReducedMotion: boolean;
  getTransition: AnimationConfig['getTransition'];
}

export type ActionButtonProps = Omit<
  CustomButtonProps,
  'startIcon' | 'text'
> & {
  label: string;
  icon: ReactNode;
};

export type BadgeFlag = HackathonType | 'isGitpodTemplate';

export interface BadgeConfig {
  flag: BadgeFlag;
  src: string;
  alt: string;
  style?: CSSProperties;
  width?: number;
  height?: number;
}

export interface ShieldConfig {
  key: string;
  hrefPath: string;
  imgPath: string;
  query: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  shouldRender?: (hasProjectBoard?: boolean) => boolean;
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

export interface ProjectBadgesProps {
  badges: BadgeConfig[];
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

export interface InternalCardProps extends CardProps {
  motionProps?: MotionProps;
}

// Card component internal types (from Card.tsx)
export interface CardComponentProps extends InternalCardProps {
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
}

export interface CvModalProviderProps {
  children: ReactNode;
}

export interface BadgeItemProps {
  href: string;
  imgSrc: string;
  date: string;
}

export interface BadgesProps {
  items?: BadgeItemProps[];
}

export interface BadgeImageProps {
  src: string;
  alt: string;
  style?: CSSProperties;
  width?: number;
  height?: number;
}

export interface BaseModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  contentSx?: SxProps<Theme>;
  animationPreset?: ModalAnimationPreset;
  ariaLabelledBy?: string;
  ariaDescribedBy?: string;
  transparentPaper?: boolean;
  maxWidth?: false | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
}

export type ModalAnimationPreset = 'modal' | 'slideDown' | 'zoomOut';

export interface CardProps {
  title?: string;
  subtitle?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  sx?: SxProps<Theme>;
  noContentPadding?: boolean;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
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
  label: string;
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

export interface ScrollToTopProps {
  window?: () => Window;
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
export type ThemeModeUpdater = (
  value: PaletteMode | ((previous: PaletteMode) => PaletteMode)
) => void;

// Split state for render optimization - read-only state
export interface ThemeModeState {
  mode: PaletteMode;
}

// Split actions for render optimization - action dispatchers
export interface ThemeModeActions {
  toggleMode: () => void;
  setMode: ThemeModeUpdater;
}

// Combined type for backwards compatibility
export interface ThemeModeValue extends ThemeModeState, ThemeModeActions {}

export type SectionMotionVariantId =
  | 'hero'
  | 'aboutMe'
  | 'portfolio'
  | 'workExperience'
  | 'contact';

// Motion variants keys - hardcoded to avoid runtime import if possible, or just use string
export type MotionVariantId =
  | SectionMotionVariantId
  | 'slideFromLeft'
  | 'slideFromRight'
  | 'slideFromLeftAndRight'
  | 'slideLeftToCenter'
  | 'slideRightToCenter'
  | 'staggerContainer'
  | 'staggerItem'
  | 'cardHover'
  | 'buttonTap'
  | 'scrollFadeUp'
  | 'scrollParallax'
  | 'layoutGroup';

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

export interface ScrollProgressValue {
  value: MotionValue<number>;
  progress: number;
}

export interface PresenceControls {
  isPresent: boolean;
  safeToRemove: (() => void) | null;
}

export type SequenceAnimator = (
  target: ElementOrSelector,
  keyframes: DOMKeyframesDefinition,
  options?: AnimationOptions
) => AnimationPlaybackControls;

export type AnimateScope =
  | ((node: Element | null) => void)
  | RefObject<Element | null>
  | null;

export interface AnimationSequenceControls {
  scopeRef: (node: Element | null) => void;
  runSequence: (
    builder: (animate: SequenceAnimator) => Promise<void> | void
  ) => Promise<void>;
  isAnimating: boolean;
}

export type AnimationPriority = 'high' | 'reduced';

export type AnimateActivityMode = 'visible' | 'hidden';
export type LayoutMode = 'sync' | 'pop';

export interface AnimateActivityProps {
  children: ReactNode;
  mode: AnimateActivityMode;
  layoutMode?: LayoutMode;
  onExitComplete?: () => void;
}

export interface TimelineSegment {
  target: ElementOrSelector;
  keyframes: DOMKeyframesDefinition;
  options?: AnimationOptions & { at?: number | string };
}

export type TimelineSequence = (TimelineSegment | string)[];

export type SequenceItem =
  | [ElementOrSelector, DOMKeyframesDefinition]
  | [ElementOrSelector, DOMKeyframesDefinition, AnimationOptions];

export type StaggerContainerOptions = {
  exitDirection?: 1 | -1;
  exitStagger?: number;
  initialOpacity?: number;
  animateOpacity?: number;
};

export interface TimelineControls {
  play: () => void;
  pause: () => void;
  stop: () => void;
  time: number;
  duration: number;
  speed: number;
}

export interface MeasureRect {
  width: number;
  height: number;
  top: number;
  left: number;
}

export interface UseMeasureReturn<T extends HTMLElement = HTMLElement> {
  ref: (node: T | null) => void;
  bounds: MeasureRect;
  remeasure: () => void;
}

export interface GestureVariants {
  variants: Variants;
  initial?: string;
  animate?: string;
  whileHover?: string;
  whileTap?: string;
  whileFocus?: string;
  transition?: Transition;
}

export type CardHoverMotion = GestureVariants;

export interface StaggerConfig {
  container: Variants;
  item: Variants;
}

export interface ScrollAnimationConfig {
  initial?: MotionProps['initial'];
  animate?: MotionProps['animate'];
  whileInView?: MotionProps['whileInView'];
  viewport?: MotionProps['viewport'];
  transition?: Transition;
}

export type MotionLayoutSetting = boolean | 'position' | 'size';

export interface LayoutAnimationProps {
  layout?: MotionLayoutSetting;
  layoutId?: string;
  transition?: Transition;
}

export interface MotionWrapperProps extends MotionProps {
  children: ReactNode;
  sectionId: SectionMotionVariantId;
}

export interface FadeInViewProps extends Omit<
  MotionProps,
  'initial' | 'animate'
> {
  children: ReactNode;
  delay?: number;
  threshold?: number;
  ref?: React.Ref<HTMLDivElement>;
}

export interface StaggerContainerProps {
  children: ReactNode;
  stagger?: number;
  className?: string;
  style?: CSSProperties;
  sx?: SxProps<Theme>;
}

export interface StaggerItemProps {
  children: ReactNode;
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

export interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  as?: ElementType;
  style?: CSSProperties;
  sx?: SxProps<Theme>;
}

export interface TextRevealExtendedProps extends TextRevealProps {
  // 'word' = word-by-word (default), 'char' = character-by-character
  splitBy?: 'word' | 'char';
}

export interface SlideFromSideProps extends MotionProps {
  children: ReactNode;
  from: 'left' | 'right';
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

export interface SectionWrapperProps {
  sectionId: SectionMotionVariantId;
  children: ReactNode;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export interface ExtendedErrorBoundaryProps extends ErrorBoundaryProps {
  onReset?: () => void;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

// --- Feature: Experience ---
export type ExperienceCategory = 'work' | 'education';

export interface Experience {
  type: ExperienceCategory;
  title: string;
  workplace?: string;
  school?: string;
  duration: string;
  description: string[];
  hasCredential?: boolean;
}

export interface ExperienceCardProps {
  experience: Experience;
  align?: 'left' | 'right';
}

// WorkExperience component internal ExperienceCardProps (extends BaseCardProps)
// Note: This is different from the legacy ExperienceCardProps above
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

export type ContactFormErrors = Partial<
  Record<'name' | 'email' | 'url' | 'message', string>
>;

export type ContactFieldKey = keyof ContactFormValues;
export type ContactFieldErrorKey = keyof ContactFormErrors;

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
  errorKey?: ContactFieldErrorKey;
  gridProps?: { xs?: number; md?: number };
}

export interface SuccessIndicatorProps {
  visible: boolean;
}

export interface FormActionsProps {
  onReset: () => void;
  isPending: boolean;
}

export type SubmissionResult = {
  status: 'idle' | 'success' | 'error';
  errorMessage?: string;
};

export interface FormFieldProps {
  controlId: string;
  icon: ElementType;
  type?: 'text' | 'email' | 'url' | 'textarea';
  name: string;
  label?: string;
  placeholder: string;
  value?: string;
  defaultValue?: string;
  error?: string;
  required?: boolean;
  minRows?: number;
  maxRows?: number;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  disabled?: boolean;
}

export interface FormFieldsProps {
  formData: ContactFormValues;
  errors: ContactFormErrors;
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  disabled?: boolean;
}

// --- Feature: Skills ---
export interface Skill {
  icon: IconComponent;
  label: string;
  learning?: boolean;
}

export interface SkillCardProps {
  skill: Skill;
}

export interface SkillBadgeProps {
  skill: Skill;
}

// --- Pages ---
export type SectionId =
  | 'hero'
  | 'aboutMe'
  | 'skills'
  | 'portfolio'
  | 'workExperience'
  | 'contact';

export interface SectionConfig {
  id: SectionId;
  Component: ComponentType;
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

export type SocialLinkRenderer = (props: SocialLinkRenderProps) => ReactElement;

export type SocialLinkWrapper = (
  id: string,
  node: ReactElement
) => ReactElement;

export interface SocialLinkListProps {
  openModal: () => void;
  renderLink: SocialLinkRenderer;
  wrapItem?: SocialLinkWrapper;
  iconSize?: string | number | { xs?: string | number; sm?: string | number };
}

export interface OffcanvasMenuProps {
  showOffcanvas: boolean;
  closeOffcanvas: () => void;
  openOffcanvas: () => void;
  openModal: () => void;
}

// --- Snackbar Context ---
export interface SnackbarOptions {
  message: string;
  severity?: AlertColor;
  duration?: number | null;
}

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
export interface UseClickOutsideOptions {
  enabled?: boolean;
}

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

export interface UseLazyReturn<T> {
  value: T;
  refresh: () => void;
}

export type StorageSource = Storage | 'local' | 'session';

export interface UseStorageOptions<T> {
  storage?: StorageSource;
  serializer?: (value: T) => string;
  parser?: (value: string) => T;
  listen?: boolean;
  validate?: (data: unknown) => data is T;
}

export interface UseStorageReturn<T> {
  value: T;
  set: (value: T | ((previous: T) => T)) => void;
  get: () => T;
  remove: () => void;
  refresh: () => void;
  isSupported: boolean;
  error: Error | null;
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

export type SequenceStepKey = 'description' | 'cards' | 'cta';

export type TimelineSequenceSelectors = {
  cards?: string;
  description?: string;
  cta?: string;
  [key: string]: string | undefined;
};

export type TimelineSequenceOptions = {
  offset?: UseScrollOptions['offset'];
  threshold?: number;
};

export interface TimelineSectionControllerOptions {
  viewportPreset?: { once?: boolean; amount?: number | 'some' | 'all' };
  selectors: TimelineSequenceSelectors;
  sequenceOptions?: TimelineSequenceOptions;
  variants?: Variants;
  hoverEffect?: Target | string;
  initialState?: string;
  visibleState?: string;
  hiddenState?: string;
}

// --- Scroll & Navigation Hooks ---
export type ScrollDirection = 'up' | 'down';

export interface ScrollBoundaries {
  isAtTop: boolean;
  isAtBottom: boolean;
}

export interface UseScrollEventsProps {
  onNavigate: (direction: ScrollDirection) => boolean;
  shouldDisable: boolean; // Disables ALL event listeners (touch, wheel, keyboard)
  disableNonTouchInputs?: boolean; // Only disables wheel and keyboard, keeps touch active
  isScrolling: React.MutableRefObject<boolean>;
}

export interface UseScrollAnimationOptions {
  offset?: UseScrollOptions['offset'];
  triggerThreshold?: number;
}

// --- Utils ---
export type ValidationError = string | undefined;

export type PaletteModeKey = 'light' | 'dark';

export type StatusBanner = {
  message: string;
  severity: AlertColor;
  persistent: boolean;
};

// Query utility types (from utils/query/utils.ts)
export type QueryErrorType = 'network' | 'rate-limit' | 'not-found' | 'unknown';

export interface QueryErrorInfo {
  type: QueryErrorType;
  message: string;
  retryable: boolean;
}

// Background utility types (from utils/background.ts)
export interface GradientConfig {
  primaryGradient: string;
  secondaryGradient: string;
  tertiaryGradient: string;
}

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

// Timeline utility types (from utils/timeline.ts)
export type TimelineAlignment = 'left' | 'right';

// Validation utility types (from utils/validation.ts)
export interface ValidatorConfig {
  required?: string;
  pattern?: { regex: RegExp; error: string };
  minLength?: { value: number; error: string };
  optional?: boolean;
}

// Component overrides types (from config/overrides.ts)
export type Components<T = unknown> = Record<string, { styleOverrides?: T }>;

// BackgroundMorph types (from components/BackgroundMorph.tsx)
export type BlobConfig = {
  inset: string;
  size: string;
  blur?: number;
  opacity?: number;
};

export type FadeVariant = 'in' | 'up' | 'down';
export type ScaleVariant = 'in' | 'pop';
export type SlideVariant = 'fromLeft' | 'fromRight' | 'fromBottom';
export type GestureVariant = 'hoverScale' | 'cardHover' | 'buttonTap';
export type SectionVariant =
  | 'default'
  | 'fade'
  | 'slideUp'
  | 'slideLeft'
  | 'slideRight'
  | 'scale';

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
