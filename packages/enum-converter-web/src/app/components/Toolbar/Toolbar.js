import { faGithub, faNpm } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { compose, withApollo } from 'react-apollo';
import { GET_VERSION } from '../App/get-version';
import styles from './Toolbar.module.scss';

class AppToolbar extends Component {
  state = {
    version: ''
  };

  componentDidMount() {
    this.getVersion();
  }

  async getVersion() {
    const {
      data: { version }
    } = await this.props.client.query({ query: GET_VERSION });
    this.setState({ version });
    this.props.onReady();
  }

  render() {
    const { version } = this.state;

    return (
      <div className={styles.root}>
        <AppBar position="static">
          <Toolbar>
            <h2 className={styles.header}>{`Enum Converter ${version}`}</h2>

            <a
              className={styles.link}
              href="https://www.npmjs.com/package/enum-converter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faNpm} />
            </a>
            <a
              className={styles.link}
              href="https://github.com/nitzano/enum-converter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faGithub} />
            </a>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

AppToolbar.propTypes = {
  onReady: PropTypes.func.isRequired
};

AppToolbar.defaultProps = {
  onReady: () => {}
};

export default compose(
  withApollo,
  withWidth()
)(AppToolbar);
