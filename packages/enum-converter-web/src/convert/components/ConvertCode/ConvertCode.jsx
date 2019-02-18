import axios from 'axios';
import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Cancel from '@material-ui/icons/Cancel';
import Save from '@material-ui/icons/Save';
import CloudUpload from '@material-ui/icons/CloudUpload';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import PropTypes from 'prop-types';
import { UnControlled as CodeMirror } from 'react-codemirror2';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/monokai.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';

import './ConvertCode.scss';

import { saveAs } from 'file-saver';

const styles = {
  select: {
    flexGrow: 1,
    textAlign: 'center'
  },
  tooltip: {
    fontSize: '1rem'
  }
};

class ConvertCode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      languageOptions: {},
      suffixOptions: {}
    };
  }

  static defaultProps = {
    showClear: false,
    showDownload: false,
    showUpload: false
  };

  static propTypes = {
    code: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    onCodeChange: PropTypes.func,
    onLanguageChange: PropTypes.func,
    showClear: PropTypes.bool,
    showDownload: PropTypes.bool,
    showError: PropTypes.bool,
    showUpload: PropTypes.bool
  };

  componentDidMount() {
    axios.get('/api/options/languages').then(resp => {
      this.setState({ languageOptions: resp.data.Language });
    });

    axios.get('/api/options/enums').then(resp => {
      this.setState({ suffixOptions: resp.data.LanguageSuffix });
    });
  }

  handleLanguageChange = (event, child) => {
    const value = event.target.value;
    this.props.onLanguageChange && this.props.onLanguageChange(value);
  };

  handleClearCode = event => {
    this.props.onCodeChange && this.props.onCodeChange('');
  };

  handleCodeChange = code => {
    this.props.onCodeChange && this.props.onCodeChange(code);
  };

  convertToMode = language => {
    switch (language) {
      case 'json':
        return 'javascript';
      case 'typescript':
      case 'java':
        return 'clike';
      default:
        break;
    }

    return language && language.toLowerCase();
  };

  getFileSuffix() {
    let suffix = 'txt';

    const languages = Object.entries(this.state.languageOptions);
    const languageToken = languages.find(
      pair => pair[1] === this.props.language
    );

    if (languageToken) {
      const suffixPair = Object.entries(this.state.suffixOptions).find(
        pair => pair[0] === languageToken[0]
      );
      if (suffixPair) {
        suffix = suffixPair[1];
      }
    }

    return suffix;
  }

  handleDownload = event => {
    const fileSuffix = this.getFileSuffix();

    var file = new File([this.props.code], `enums.${fileSuffix}`, {
      type: 'text/plain;charset=utf-8'
    });
    saveAs(file);
  };

  handleUpload = event => {
    if (this.fileUpload && this.fileUpload.files && this.fileUpload.files[0]) {
      const file = this.fileUpload.files[0];
      const reader = new FileReader();

      reader.onload = e => {
        this.props.onCodeChange && this.props.onCodeChange(reader.result);
      };

      reader.readAsText(file);
    }
  };

  renderLanguages = () => {
    return (
      <Select
        className={this.props.classes.select}
        value={this.props.language}
        onChange={this.handleLanguageChange}
      >
        {Object.entries(this.state.languageOptions).map(([label, value]) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    );
  };

  render() {
    return (
      <div className="ConvertCode">
        <div className="ConvertCode__languages">{this.renderLanguages()}</div>
        <div className="ConvertCode__code">
          <div className="ConvertCode__icons">
            {this.props.showClear && (
              <Tooltip
                className="tooltip tooltip--clear"
                title="Clear"
                classes={{ tooltip: this.props.classes.tooltip }}
              >
                <IconButton onClick={this.handleClearCode} color="inherit">
                  <Cancel />
                </IconButton>
              </Tooltip>
            )}
            {this.props.showDownload && (
              <Tooltip
                className="tooltip tooltip--download"
                title="Download"
                classes={{ tooltip: this.props.classes.tooltip }}
              >
                <IconButton onClick={this.handleDownload} color="inherit">
                  <Save />
                </IconButton>
              </Tooltip>
            )}
            {this.props.showUpload && (
              <Tooltip
                className="tooltip tooltip--upload"
                title="Upload"
                classes={{ tooltip: this.props.classes.tooltip }}
              >
                <IconButton
                  onClick={() => this.fileUpload.click()}
                  color="inherit"
                >
                  <CloudUpload />
                  <input
                    type="file"
                    ref={fileUpload => {
                      this.fileUpload = fileUpload;
                    }}
                    style={{ display: 'none' }}
                    onChange={this.handleUpload}
                    onClick={event => {
                      event.target.value = null;
                    }}
                  />
                </IconButton>
              </Tooltip>
            )}
          </div>

          <CodeMirror
            className="ConvertCode__editor"
            value={this.props.code}
            autoCursor={false}
            inputStyle={'textarea'}
            options={{
              mode: this.convertToMode(this.props.language),
              theme: 'monokai',
              lineNumbers: true,
              styleActiveLine: true
            }}
            onChange={(editor, data, value) => this.handleCodeChange(value)}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(ConvertCode);
