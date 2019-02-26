import CircularProgress from '@material-ui/core/CircularProgress';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import axios from 'axios';
import React, { Component } from 'react';
import ConvertScreen from '../../../convert/components/ConvertScreen/ConvertScreen';
import AppToolbar from '../Toolbar/Toolbar';
import styles from './App.module.scss';
import { EnumConverterTheme } from './theme';

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
    const { ready, loading, version } = this.state;

    return (
      <MuiThemeProvider theme={EnumConverterTheme}>
        <div className={styles.root}>
          <AppToolbar version={version} />
          {ready && (
            <div className={styles.convertScreen}>
              <ConvertScreen />
            </div>
          )}
          {loading && (
            <div className={styles.loader}>
              <CircularProgress size={65} thickness={4} />
            </div>
          )}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
