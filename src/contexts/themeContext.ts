import { createContext } from 'react';

import { ThemeModeValue } from '@/config/types';

export type { ThemeModeUpdater, ThemeModeValue } from '@/config/types';

export const ThemeMode = createContext<ThemeModeValue | null>(null);
