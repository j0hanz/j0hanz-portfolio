import {
  ChangeEvent,
  ComponentType,
  CSSProperties,
  ElementType,
  ReactElement,
  ReactNode,
} from 'react';

import {
  ButtonProps as MuiButtonProps,
  PaletteMode,
  SxProps,
  Theme,
} from '@mui/material';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import type { MotionProps, Transition, Variants } from 'motion/react';

// --- Icon Type ---
export type IconComponent = ComponentType<SvgIconProps>;

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

// --- Feature: Projects ---
export interface Project {
  title: string;
  description: string;
  github: string;
  demo: string;
  technologies: string[];
  collaborative: boolean;
  isHackathon: boolean;
  isHackathon_2: boolean;
  isHackathon_3: boolean;
  api: boolean;
  gitpod_template?: boolean;
  isNew?: boolean;
  projectBoard?: boolean;
}

export type BadgeFlag =
  | 'isHackathon'
  | 'isHackathon_2'
  | 'isHackathon_3'
  | 'gitpod_template';

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

export interface BadgeItemProps {
  href: string;
  imgSrc: string;
  date: string;
}

export interface BaseModalProps {
  show: boolean;
  handleClose: () => void;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  contentSx?: SxProps<Theme>;
  animationPreset?: ModalAnimationPreset;
}

export type ModalAnimationPreset = 'modal' | 'slideDown' | 'zoomOut';

export interface CardProps {
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
  sx?: SxProps<Theme>;
  noContentPadding?: boolean;
}

export interface CustomButtonProps extends MuiButtonProps {
  text?: string;
  className?: string;
  target?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  variant?: 'text' | 'contained' | 'outlined';
  motionWhileTap?: MotionProps['whileTap'];
  motionWhileHover?: MotionProps['whileHover'];
  motionWhileFocus?: MotionProps['whileFocus'];
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
  show: boolean;
  handleClose: () => void;
}

export interface ImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  style?: CSSProperties;
  onClick?: () => void;
  radius?: 'rounded' | 'circle' | 'flat';
}

export interface ModalCvProps {
  show: boolean;
  handleClose: () => void;
}

export interface ScrollToTopProps {
  window?: () => Window;
}

// --- Theme ---
export type ThemeModeUpdater = (
  value: PaletteMode | ((previous: PaletteMode) => PaletteMode)
) => void;

export interface ThemeModeValue {
  mode: PaletteMode;
  toggleMode: () => void;
  setMode: ThemeModeUpdater;
}

export type SectionMotionVariantId =
  | 'hero'
  | 'aboutMe'
  | 'education'
  | 'skills'
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

export type TransitionPreset = 'spring' | 'smooth' | 'slow';

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
}

export interface SectionWrapperProps {
  sectionId: SectionMotionVariantId;
  children: ReactNode;
}

export interface ErrorBoundaryProps {
  children: ReactNode;
}

export interface ErrorBoundaryState {
  hasError: boolean;
}

// --- Feature: Education ---
export interface CredentialProps {
  show: boolean;
  handleClose: () => void;
}

export interface EducationItem {
  title: string;
  school: string;
  duration: string;
  description?: string[];
  hasCredential: boolean;
}

export interface EducationCardProps {
  education: EducationItem;
  onShowModal: () => void;
}

// --- Feature: Experience ---
export interface Experience {
  title: string;
  workplace: string;
  duration: string;
  description: string[];
}

export interface ExperienceCardProps {
  experience: Experience;
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

export interface FormFieldProps {
  controlId: string;
  icon: ElementType;
  type?: 'text' | 'email' | 'url' | 'textarea';
  name: string;
  label?: string;
  placeholder: string;
  value: string;
  error?: string;
  required?: boolean;
  rows?: number;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export interface FormFieldsProps {
  formData: {
    name: string;
    email: string;
    company?: string;
    url?: string;
    message: string;
  };
  errors: {
    name?: string;
    email?: string;
    url?: string;
    message?: string;
  };
  handleChange: (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
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

// --- Pages ---
export type SectionId =
  | 'hero'
  | 'aboutMe'
  | 'education'
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

export interface SocialLink {
  id: string;
  icon: IconComponent;
  href?: string;
  onClick?: () => void;
  tooltip: string;
  color?: string;
}

export interface SocialLinkRenderProps {
  href?: string;
  onClick?: () => void;
  tooltip: string;
  icon: ReactNode;
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
  iconSize?: string | number;
}

export interface OffcanvasMenuProps {
  showOffcanvas: boolean;
  closeOffcanvas: () => void;
  openOffcanvas: () => void;
  openModal: () => void;
}

// --- Hooks ---
export interface UseArrayReturn<T> {
  array: T[];
  set: (nextArray: T[]) => void;
  push: (...items: T[]) => void;
  pop: () => T | undefined;
  shift: () => T | undefined;
  unshift: (...items: T[]) => void;
  insert: (index: number, ...items: T[]) => void;
  remove: (index: number) => void;
  removeById: (id: unknown, key?: keyof T) => void;
  update: (index: number, item: T) => void;
  updateById: (id: unknown, item: Partial<T>, key?: keyof T) => void;
  clear: () => void;
  filter: (predicate: (item: T, index: number) => boolean) => void;
  sort: (compareFn?: (a: T, b: T) => number) => void;
  reverse: () => void;
  replace: (target: T, replacement: T) => void;
  toggle: (item: T) => void;
  isEmpty: boolean;
  length: number;
}

export interface UseCounterReturn {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
  set: (value: number) => void;
}

export interface UseFetchOptions<T = unknown> extends RequestInit {
  immediate?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  validator?: (data: unknown) => data is T;
}

export interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export interface UseFetchReturn<T> extends UseFetchState<T> {
  execute: (
    overrideUrl?: string,
    overrideOptions?: RequestInit
  ) => Promise<T | null>;
  abort: () => void;
  reset: () => void;
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

export type InitialToggleState = boolean | (() => boolean);

export interface UseToggleReturn {
  value: boolean;
  toggle: (nextValue?: boolean) => void;
  setTrue: () => void;
  setFalse: () => void;
}

export type FieldName = keyof ContactFormValues;

// --- Utils ---
export type ValidationError = string | undefined;

// --- Theme Module Augmentation ---
declare module '@mui/material/styles' {
  interface Palette {
    heroGradient: string;
    neutral: Palette['primary'];
    backdrop: {
      glass: string;
    };
  }
  interface PaletteOptions {
    heroGradient?: string;
    neutral?: PaletteOptions['primary'];
    backdrop?: {
      glass?: string;
    };
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}
