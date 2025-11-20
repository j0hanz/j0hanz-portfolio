import {
  ChangeEvent,
  ComponentType,
  CSSProperties,
  ElementType,
  LazyExoticComponent,
  ReactElement,
  ReactNode,
} from 'react';

import { IconType } from 'react-icons';

import {
  ButtonProps as MuiButtonProps,
  PaletteMode,
  SxProps,
  Theme,
} from '@mui/material';
import { MotionProps } from 'framer-motion';

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
}

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

// Motion variants keys - hardcoded to avoid runtime import if possible, or just use string
export type MotionVariantId =
  | 'hero'
  | 'aboutMe'
  | 'education'
  | 'skills'
  | 'portfolio'
  | 'workExperience'
  | 'contact'
  | 'slideFromLeft'
  | 'slideFromRight'
  | 'slideFromLeftAndRight';

export interface MotionWrapperProps extends MotionProps {
  children: ReactNode;
  sectionId: MotionVariantId;
}

export interface SlideFromSideProps extends MotionProps {
  children: ReactNode;
  from: 'left' | 'right';
}

export interface SectionContainerProps {
  id: string;
  title: string;
  icon: ElementType;
  children: ReactNode;
  className?: string;
  sx?: SxProps<Theme>;
}

export interface SectionWrapperProps {
  sectionId: MotionVariantId;
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
  icon: IconType; // Unifying to IconType as it is used in data
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
  Component: LazyExoticComponent<ComponentType>;
}

// --- Navigation ---
export interface NavLink {
  id: string;
  icon: IconType;
  label: string;
}

export interface SocialLink {
  id: string;
  icon: IconType;
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
}

export interface OffcanvasMenuProps {
  showOffcanvas: boolean;
  closeOffcanvas: () => void;
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
