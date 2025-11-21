import { KeyboardArrowUpRounded } from '@mui/icons-material';
import { Box, Fab, Fade } from '@mui/material';

import { useNavigation } from '@/hooks/useNavigation';

function ScrollToTop(): React.JSX.Element {
  const { activeSectionIndex, setActiveSection } = useNavigation();
  const show = activeSectionIndex > 0;

  const handleClick = (): void => {
    setActiveSection(0);
  };

  return (
    <Fade in={show}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16, zIndex: 100 }}
      >
        <Fab size="small" color="primary" aria-label="scroll back to top">
          <KeyboardArrowUpRounded sx={{ fontSize: 20 }} />
        </Fab>
      </Box>
    </Fade>
  );
}

export default ScrollToTop;
