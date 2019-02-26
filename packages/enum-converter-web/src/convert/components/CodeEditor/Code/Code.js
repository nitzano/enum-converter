import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/clike/clike';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/python/python';
import 'codemirror/theme/monokai.css';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { UnControlled as CodeMirror } from 'react-codemirror2';
import styles from './Code.module.scss';

class CodeEditorCode extends Component {
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

  handleCodeChange = (editor, data, value) => {
    this.props.onChange(value);
  };

  render() {
    const { language, value } = this.props;

    return (
      <div className={styles.root}>
        <CodeMirror
          className={styles.editor}
          value={value}
          autoCursor={false}
          inputStyle={'textarea'}
          options={{
            mode: this.convertToMode(language),
            theme: 'monokai',
            lineNumbers: true,
            styleActiveLine: true
          }}
          onChange={this.handleCodeChange}
        />
      </div>
    );
  }
}

CodeEditorCode.propTypes = {
  language: PropTypes.string.isRequired,
  value: PropTypes.string,
  onChange: PropTypes.func
};

CodeEditorCode.defaultProps = {
  value: '',
  onChange: () => {}
};

export default CodeEditorCode;
