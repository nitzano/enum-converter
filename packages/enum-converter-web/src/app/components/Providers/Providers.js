import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import React, { Component } from 'react';
import Store from '../../../store/components/Store/Store';
import GraphQLProvider from '../../providers/graphql/GraphQLProvider';
import { EnumConverterTheme } from '../App/theme';

class AppProviders extends Component {
  render() {
    return (
      <Store>
        <MuiThemeProvider theme={EnumConverterTheme}>
          <GraphQLProvider>{this.props.children}</GraphQLProvider>
        </MuiThemeProvider>
      </Store>
    );
  }
}

export default AppProviders;
