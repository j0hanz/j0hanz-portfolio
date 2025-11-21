import KeyboardArrowUpRounded from '@mui/icons-material/KeyboardArrowUpRounded';
import { Box, Fab, Fade, type SxProps, type Theme } from '@mui/material';

import { useNavigation } from '@/hooks/useNavigation';

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
  const { activeSectionIndex, setActiveSection } = useNavigation();
  const show = activeSectionIndex > 0;

  const handleClick = (): void => {
    setActiveSection(0);
  };

  return (
    <Fade in={show}>
      <Box onClick={handleClick} role="presentation" sx={containerSx}>
        <Fab size="small" color="primary" aria-label="scroll back to top">
          <KeyboardArrowUpRounded sx={iconSx} />
        </Fab>
      </Box>
    </Fade>
  );
}

export default ScrollToTop;
