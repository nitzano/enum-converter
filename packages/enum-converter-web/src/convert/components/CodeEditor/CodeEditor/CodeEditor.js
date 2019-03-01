import axios from 'axios';
import { saveAs } from 'file-saver';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import CodeEditorActions from '../Actions/Actions';
import CodeEditorCode from '../Code/Code';
import CodeEditorLanguages from '../Languages/Languages';
import styles from './CodeEditor.module.scss';

class CodeEditor extends Component {
  state = {
    suffixOptions: {}
  };

  componentDidMount() {
    axios.get('/api/options/enums').then(resp => {
      this.setState({ suffixOptions: resp.data.LanguageSuffix });
    });
  }

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

  handleClear = () => {
    this.props.onCodeChange('');
  };

  handleDownload = () => {
    const fileSuffix = this.getFileSuffix();

    var file = new File([this.props.code], `enums.${fileSuffix}`, {
      type: 'text/plain;charset=utf-8'
    });
    saveAs(file);
  };

  handleUpload = () => {
    this.fileUpload.click();
  };

  handleFileUpload = () => {
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

  handleCodeChange = value => {
    this.props.onCodeChange(value);
  };

  render() {
    const {
      language,
      showClear,
      showDownload,
      showUpload,
      code,
      languageOptions
    } = this.props;

    return (
      <div className={styles.root}>
        <CodeEditorLanguages
          value={language}
          languages={languageOptions}
          onChange={this.handleLanguageChange}
        />
        <div className={styles.code}>
          <CodeEditorActions
            showClear={showClear}
            showDownload={showDownload}
            showUpload={showUpload}
            onClear={this.handleClear}
            onDownload={this.handleDownload}
            onUpload={this.handleUpload}
          />
          <CodeEditorCode
            language={language}
            value={code}
            onChange={this.handleCodeChange}
          />
        </div>
        <input
          type="file"
          ref={fileUpload => {
            this.fileUpload = fileUpload;
          }}
          style={{ display: 'none' }}
          onChange={this.handleFileUpload}
          onClick={event => {
            event.target.value = null;
          }}
        />
      </div>
    );
  }
}

CodeEditor.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  languageOptions: PropTypes.array.isRequired,
  onCodeChange: PropTypes.func,
  onLanguageChange: PropTypes.func,
  showClear: PropTypes.bool,
  showDownload: PropTypes.bool,
  showError: PropTypes.bool,
  showUpload: PropTypes.bool
};

CodeEditor.defaultProps = {
  languageOptions: [],
  showClear: false,
  showDownload: false,
  showUpload: false,
  onCodeChange: () => {},
  onLanguageChange: () => {}
};

export default CodeEditor;
