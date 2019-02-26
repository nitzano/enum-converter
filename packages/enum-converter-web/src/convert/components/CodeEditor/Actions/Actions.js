import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Cancel from '@material-ui/icons/Cancel';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Save from '@material-ui/icons/Save';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import styles from './Actions.module.scss';

const materialStyles = {
  tooltip: {
    fontSize: '1rem'
  }
};

class CodeEditorActions extends Component {
  render() {
    const {
      showClear,
      showDownload,
      showUpload,
      onClear,
      onDownload,
      onUpload,
      classes
    } = this.props;

    return (
      <div className={styles.root}>
        {showClear && (
          <Tooltip
            className="tooltip tooltip--clear"
            title="Clear"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton onClick={onClear} color="inherit">
              <Cancel />
            </IconButton>
          </Tooltip>
        )}
        {showDownload && (
          <Tooltip
            className="tooltip tooltip--download"
            title="Download"
            classes={{ tooltip: classes.tooltip }}
          >
            <IconButton onClick={onDownload} color="inherit">
              <Save />
            </IconButton>
          </Tooltip>
        )}
        {showUpload && (
          <Tooltip
            className="tooltip tooltip--upload"
            title="Upload"
            classes={{ tooltip: this.props.classes.tooltip }}
          >
            <IconButton onClick={onUpload} color="inherit">
              <CloudUpload />
            </IconButton>
          </Tooltip>
        )}
      </div>
    );
  }
}

CodeEditorActions.propTypes = {
  onDownload: PropTypes.func,
  onClear: PropTypes.func,
  onUpload: PropTypes.func,
  showUpload: PropTypes.bool,
  showDownload: PropTypes.bool,
  showClear: PropTypes.bool
};

CodeEditorActions.defaultProps = {
  onClear: () => {},
  onDownload: () => {},
  onUpload: () => {}
};

export default withStyles(materialStyles)(CodeEditorActions);
