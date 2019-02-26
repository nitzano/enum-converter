import { faGithub, faNpm } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './Toolbar.module.scss';

class AppToolbar extends Component {
  render() {
    const { version } = this.props;

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
  version: PropTypes.string
};

AppToolbar.defaultProps = {
  version: ''
};

export default withWidth()(AppToolbar);
