import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import Cancel from '@material-ui/icons/Cancel';
import CloudUpload from '@material-ui/icons/CloudUpload';
import Save from '@material-ui/icons/Save';
import axios from 'axios';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/theme/monokai.css';
import { saveAs } from 'file-saver';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import Languages from '../Languages/Languages';
import './ConvertCode.scss';

const styles = {
  tooltip: {
    fontSize: '1rem'
  }
};

class ConvertCode extends Component {
  state = {
    languageOptions: {},
    suffixOptions: {}
  };

  componentDidMount() {
    axios.get('/api/options/languages').then(resp => {
      this.setState({ languageOptions: resp.data.Language });
    });

    axios.get('/api/options/enums').then(resp => {
      this.setState({ suffixOptions: resp.data.LanguageSuffix });
    });
  }

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

  handleLanguageChange = value => {
    this.props.onLanguageChange && this.props.onLanguageChange(value);
  };

  handleClearCode = event => {
    this.props.onCodeChange && this.props.onCodeChange('');
  };

  handleCodeChange = code => {
    this.props.onCodeChange && this.props.onCodeChange(code);
  };

  render() {
    const { languageOptions } = this.state;
    const { language } = this.props;

    return (
      <div className="ConvertCode">
        <Languages
          value={language}
          languages={languageOptions}
          onChange={this.handleLanguageChange}
        />
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
                </IconButton>
              </Tooltip>
            )}
          </div>

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

ConvertCode.defaultProps = {
  showClear: false,
  showDownload: false,
  showUpload: false
};

ConvertCode.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  onCodeChange: PropTypes.func,
  onLanguageChange: PropTypes.func,
  showClear: PropTypes.bool,
  showDownload: PropTypes.bool,
  showError: PropTypes.bool,
  showUpload: PropTypes.bool
};

export default withStyles(styles)(ConvertCode);
