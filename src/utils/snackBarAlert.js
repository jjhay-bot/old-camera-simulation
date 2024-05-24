import React from 'react';

import { SnackbarProvider, wrapComponent } from 'react-snackbar-alert';

export default function DemoExample() {
  return (
    <SnackbarProvider position="bottom">
      <Container />
    </SnackbarProvider>
  );
}

const Container = wrapComponent(function({ createSnackbar }) {
  function showSnackbar() {
    createSnackbar({
      message: 'Hello Snackbar!',
      dismissable: false,
      pauseOnHover: false,
      progressBar: true,
      sticky: false,
      theme: 'default',
      timeout: 3000
    });
  }
//   showSnackbar()
  return (
    <div>
      {showSnackbar}
    </div>
  );
});