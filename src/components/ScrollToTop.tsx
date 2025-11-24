import KeyboardArrowUpRounded from '@mui/icons-material/KeyboardArrowUpRounded';
import { Box, Fab, Fade, type SxProps, type Theme } from '@mui/material';

import {
  useNavigationActions,
  useNavigationState,
} from '@/hooks/useNavigation';

const containerSx: SxProps<Theme> = {
  position: 'fixed',
  bottom: 16,
  right: 16,
  zIndex: 100,
};

const iconSx: SxProps<Theme> = {
  fontSize: 20,
};

function ScrollToTop(): React.JSX.Element {
  const { activeSectionIndex, isPending } = useNavigationState();
  const { setActiveSection } = useNavigationActions();
  const show = activeSectionIndex > 0;

  const handleClick = (): void => {
    if (isPending) return;
    setActiveSection(0);
  };

  return (
    <Fade in={show}>
      <Box onClick={handleClick} role="presentation" sx={containerSx}>
        <Fab
          size="small"
          color="primary"
          aria-label="scroll back to top"
          disabled={isPending}
        >
          <KeyboardArrowUpRounded sx={iconSx} />
        </Fab>
      </Box>
    </Fade>
  );
}

export default ScrollToTop;
