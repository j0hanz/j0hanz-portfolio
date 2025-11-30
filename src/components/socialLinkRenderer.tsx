import type { JSX } from 'react';

import type { SocialLinkRenderProps } from '@/config/types';

import { SocialLinkButton } from './SocialLinks';

// Default renderer for SocialLinkList - eliminates duplication in NavBar and Footer
export const defaultSocialLinkRenderer = (
  props: SocialLinkRenderProps
): JSX.Element => <SocialLinkButton {...props} />;
