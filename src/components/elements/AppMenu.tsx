'use client';

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import MuiMenu, { MenuProps as MuiMenuProps } from '@mui/material/Menu';
import MuiMenuItem, { MenuItemProps as MuiMenuItemProps } from '@mui/material/MenuItem';
import { appMuiTheme } from '@/lib/mui/theme';

export interface AppMenuProps extends MuiMenuProps {}

export const AppMenu: React.FC<AppMenuProps> = (props) => {
  return (
    <ThemeProvider theme={appMuiTheme}>
      <MuiMenu
        {...props}
        slotProps={{
          paper: {
            className: 'py-1',
          },
        }}
      />
    </ThemeProvider>
  );
};

export const AppMenuItem: React.FC<MuiMenuItemProps> = ({ className, ...props }) => {
  return (
    <MuiMenuItem
      {...props}
      className={
        className ??
        'text-[13px] text-text-secondary hover:text-text-primary hover:bg-white/5 px-3 py-1.5'
      }
    />
  );
};

