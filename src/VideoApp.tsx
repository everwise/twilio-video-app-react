import React from 'react';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import App from './App';
import { useAppState } from './state';
import ErrorDialog from './components/ErrorDialog/ErrorDialog';
import { VideoProvider } from './components/VideoProvider';
import useConnectionOptions from './utils/useConnectionOptions/useConnectionOptions';
import UnsupportedBrowserWarning from './components/UnsupportedBrowserWarning/UnsupportedBrowserWarning';
import { SnackbarProvider } from 'notistack';

import theme from './theme';
import './types';

interface VideoAppProps {
  userName?: string;
  roomName?: string;
  tokenEndpoint?: string;
}

export default function VideoApp({ tokenEndpoint, userName, roomName }: VideoAppProps) {
  const { error, setError, setTokenEndpoint } = useAppState();
  const connectionOptions = useConnectionOptions();

  if (tokenEndpoint) {
    setTokenEndpoint(tokenEndpoint);
  }

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={8}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        autoHideDuration={10000}
        variant="info"
      >
        <UnsupportedBrowserWarning>
          <VideoProvider options={connectionOptions} onError={setError}>
            <ErrorDialog dismissError={() => setError(null)} error={error} />
            <App userName={userName} roomName={roomName} />
          </VideoProvider>
        </UnsupportedBrowserWarning>
      </SnackbarProvider>
    </MuiThemeProvider>
  );
}
