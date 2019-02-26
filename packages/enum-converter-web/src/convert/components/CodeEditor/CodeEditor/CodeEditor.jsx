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
import CodeEditorActions from '../Actions/Actions';
import CodeEditorLanguages from '../Languages/Languages';
import styles from './CodeEditor.module.scss';

class CodeEditor extends Component {
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

  handleCodeChange = code => {
    this.props.onCodeChange && this.props.onCodeChange(code);
  };

  render() {
    const { language, showClear, showDownload, showUpload } = this.props;
    const { languageOptions } = this.state;

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

          <CodeMirror
            className={styles.editor}
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

CodeEditor.defaultProps = {
  showClear: false,
  showDownload: false,
  showUpload: false,
  onCodeChange: () => {},
  onLanguageChange: () => {}
};

CodeEditor.propTypes = {
  code: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  onCodeChange: PropTypes.func,
  onLanguageChange: PropTypes.func,
  showClear: PropTypes.bool,
  showDownload: PropTypes.bool,
  showError: PropTypes.bool,
  showUpload: PropTypes.bool
};

export default CodeEditor;
