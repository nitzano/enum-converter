import CircularProgress from '@material-ui/core/CircularProgress';
import React, { Component } from 'react';
import ConvertScreen from '../../../convert/components/ConvertScreen/ConvertScreen';
import AppProviders from '../Providers/Providers';
import AppToolbar from '../Toolbar/Toolbar';
import styles from './App.module.scss';

class App extends Component {
  state = {
    ready: false,
    loading: false
  };

  componentDidMount() {
    setTimeout(() => {
      if (!this.state.ready) {
        this.setState({ loading: true });
      }
    }, 500);
  }

  handleReady = () => {
    this.setState({
      ready: true,
      loading: false
    });
  };

  render() {
    const { ready, loading } = this.state;

    return (
      <AppProviders>
        <div className={styles.root}>
          <AppToolbar onReady={this.handleReady} />
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
      </AppProviders>
    );
  }
}

export default App;
