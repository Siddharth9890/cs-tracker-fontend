// @mui
import { styled, alpha } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
//
// import { any } from '../types';

// ----------------------------------------------------------------------

type Props = Omit<any, 'item'>;

export const ListItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<any>(({ active, theme }) => ({
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  height: 48,
  // Active
  ...(active && {
    color: theme.palette.primary.main,
    ...theme.typography.subtitle2,
    backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
  }),
}));
