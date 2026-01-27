import type { MenuActions, MenuState } from '@/contexts/MenuContext';
import { MenuActionsContext, MenuStateContext } from '@/contexts/MenuContext';
import { createSplitContextHooks } from '@/utils/context';

export const [useMenuState, useMenuActions] = createSplitContextHooks<
  MenuState,
  MenuActions
>(
  { state: MenuStateContext, actions: MenuActionsContext },
  'Menu',
  'MenuProvider'
);
