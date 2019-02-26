import { faGithub, faNpm } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import withWidth from '@material-ui/core/withWidth';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import './Toolbar.scss';

class AppToolbar extends Component {
  render() {
    return (
      <div className="AppToolbar">
        <AppBar position="static">
          <Toolbar>
            <h2 className="AppToolbar__typography">
              {`Enum Converter ${
                this.props.version ? `${this.props.version}` : ''
              }`}
            </h2>

            <a
              className="AppToolbar__link"
              href="https://www.npmjs.com/package/enum-converter"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faNpm} />
            </a>
            <a
              className="AppToolbar__link"
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

export default withWidth()(AppToolbar);
