import type { ReactNode } from 'react';

import type { MenuActions, MenuState } from '@/contexts/MenuContext';
import { MenuActionsContext, MenuStateContext } from '@/contexts/MenuContext';
import { useEventCallback, useToggle } from '@/hooks';

export function MenuProvider({
  children,
}: Readonly<{ children: ReactNode }>): React.JSX.Element {
  const menu = useToggle(false);

  const stateValue: MenuState = { isMenuOpen: menu.value };

  const openMenu = useEventCallback(() => menu.setTrue());
  const closeMenu = useEventCallback(() => menu.setFalse());

  const actionsValue: MenuActions = { openMenu, closeMenu };

  return (
    <MenuActionsContext value={actionsValue}>
      <MenuStateContext value={stateValue}>{children}</MenuStateContext>
    </MenuActionsContext>
  );
}
