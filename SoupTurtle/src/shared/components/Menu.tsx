import * as React from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';

import MenuItem from './MenuItem';
import LanguageSwitch from './LanguageSwitch';
import * as Common from './Common';

// #region DrawerFunctions

const drawerWidth = 280;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

// #endregion

export default function Menu() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const menuItems = [
    { labelKey: 'menu.start',   keyAttr: 'start',           suffix: '',             targetUrl: '/',               iconName: 'house',            hasDividerAfter: true   },
    { labelKey: 'menu.recipes', keyAttr: 'recipesList',     suffix: 'MUI/REST',     targetUrl: '/recipes/list',   iconName: 'book',             hasDividerAfter: true   },
    { labelKey: 'menu.recipes', keyAttr: 'recipesGrid',     suffix: 'DX/REST',      targetUrl: '/recipes/grid',   iconName: 'books',            hasDividerAfter: false  },
    { labelKey: 'menu.recipes', keyAttr: 'recipesGrido',    suffix: 'DX/ODATA',     targetUrl: '/recipes/grido',  iconName: 'book-open-cover',  hasDividerAfter: false  },
    { labelKey: 'menu.recipes', keyAttr: 'recipesGridg',    suffix: 'DX/GRAPHQL',   targetUrl: '/recipes/gridg',  iconName: 'book-sparkles',    hasDividerAfter: true   },
    { labelKey: 'menu.week',    keyAttr: 'week',            suffix: '',             targetUrl: '/weekplan',       iconName: 'plate-utensils',   hasDividerAfter: false  }
  ];

  const [selectedItem, setSelectedItem] = React.useState('');

  // Callback function to handle the selection
  const handleMenuItemClick = (keyAttr: React.SetStateAction<string>) => {
    setSelectedItem(keyAttr);
    setOpen(false);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ErrorBoundary
      FallbackComponent={({ error }) => <div>{error.message}</div>}
    >
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" open={open} color="secondary">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
              }}
            >
              <Common.Icon name='bars' />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              <Common.Icon name='bowl-hot' />
              &nbsp;
              SoupTurtle
            </Typography>
            <LanguageSwitch />
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <Common.Icon name='chevron-right' /> : <Common.Icon name='chevron-left' />}
            </IconButton>
          </DrawerHeader>
          <Divider />
          <List>
            {menuItems.map((menuItem) =>
            (
              <div key={menuItem.keyAttr + 'Sect'}>
                <MenuItem
                  key={menuItem.keyAttr}
                  isSelected={selectedItem === menuItem.keyAttr}
                  onSelect={() => handleMenuItemClick(menuItem.keyAttr)}
                  isOpen={open}
                  {...menuItem}
                />
                {menuItem.hasDividerAfter ? <Divider key={menuItem.keyAttr + 'Divder'} /> : ""}
              </div>
            )
            )}
          </List>
          <Divider />
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        </Box>
      </Box>
    </ErrorBoundary>
  );
}