'use client';

import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import MuiDialog, { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import MuiDialogContent from '@mui/material/DialogContent';
import MuiDialogActions from '@mui/material/DialogActions';
import { appMuiTheme } from '@/lib/mui/theme';

export interface AppDialogProps extends Omit<MuiDialogProps, 'onClose'> {
  title?: string;
  onClose?: () => void;
}

export const AppDialog: React.FC<AppDialogProps> = ({
  title,
  children,
  onClose,
  ...props
}) => {
  return (
    <ThemeProvider theme={appMuiTheme}>
      <MuiDialog
        {...props}
        onClose={(_, reason) => {
          if (reason === 'backdropClick') {
            onClose?.();
          } else {
            onClose?.();
          }
        }}
      >
        {title && (
          <MuiDialogTitle className="text-h2 text-text-primary border-b border-border-subtle px-5 py-4">
            {title}
          </MuiDialogTitle>
        )}
        <MuiDialogContent className="px-5 py-4 text-body text-text-secondary">
          {children}
        </MuiDialogContent>
      </MuiDialog>
    </ThemeProvider>
  );
};

export const AppDialogActions = MuiDialogActions;

