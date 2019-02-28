import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import React, { Component } from 'react';
import Store from '../../../store/components/Store/Store';
import { EnumConverterTheme } from '../App/theme';

class AppProviders extends Component {
  render() {
    return (
      <Store>
        <MuiThemeProvider theme={EnumConverterTheme}>
          {this.props.children}
        </MuiThemeProvider>
      </Store>
    );
  }
}

export default AppProviders;
