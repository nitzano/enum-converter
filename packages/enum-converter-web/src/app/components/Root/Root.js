import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import React, { Component } from 'react';
import Store from '../../../store/components/Store/Store';
import App from '../App/App';
import { EnumConverterTheme } from '../App/theme';

class Root extends Component {
  render() {
    return (
      <Store>
        <MuiThemeProvider theme={EnumConverterTheme}>
          <App />
        </MuiThemeProvider>
      </Store>
    );
  }
}

export default Root;
