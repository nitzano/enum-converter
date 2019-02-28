import CircularProgress from '@material-ui/core/CircularProgress';
import axios from 'axios';
import React, { Component } from 'react';
import ConvertScreen from '../../../convert/components/ConvertScreen/ConvertScreen';
import Root from '../Root/Root';
import AppToolbar from '../Toolbar/Toolbar';
import styles from './App.module.scss';

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
      <Root>
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
      </Root>
    );
  }
}

export default App;
