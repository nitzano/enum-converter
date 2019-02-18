import React, { Component } from 'react';
import './App.scss';
import Convert from '../../../convert/components/Convert/Convert';
import AppToolbar from '../AppToolbar/AppToolbar';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { EnumConverterTheme } from './theme';
import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      version: null,
      ready: false,
      loading: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      if (!this.state.ready) {
        this.setState({ loading: true });
      }
    }, 500);

    axios.get('/api/version').then(res => {
      if (res && res.data && res.data.version) {
        this.setState({
          version: res.data.version,
          ready: true,
          loading: false
        });
      }
    });
  }

  render() {
    return (
      <MuiThemeProvider theme={EnumConverterTheme}>
        <div
          className={`App ${this.state.loading ? 'App--loading' : ''} ${
            this.state.ready ? 'App--ready' : ''
          }`}
        >
          <div className="App__toolbar">
            <AppToolbar version={this.state.version} />
          </div>
          {this.state.ready && (
            <div className="App__convert">
              <Convert />
            </div>
          )}
          {this.state.loading && (
            <div className="App__loader">
              <CircularProgress size={65} thickness={4} />
              {/* <div className="App__loader-text">Loading...</div> */}
            </div>
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
