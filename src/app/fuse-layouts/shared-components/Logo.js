import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const Root = styled('div')(({ theme }) => ({
  '& > .logo-icon': {
    transition: theme.transitions.create(['width', 'height'], {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  '& > .badge, & > .logo-text': {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
}));

function Logo() {
  return (
    <Root className="flex items-center" style={{ justifyContent: 'center', alignItems: 'center', display: 'flex', width: '100%', marginLeft: '20%' }}>
      <img className="logo-icon w-48 h-48" src="assets/images/logos/fuse.svg" alt="logo" />
    </Root>
  );
}

export default Logo;
