import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import React, { Component } from 'react';
import { compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import {
  changeConfiguration,
  changeSource,
  convertEnum
} from '../../actions/converter.actions';
import CodeEditor from '../CodeEditor/CodeEditor/CodeEditor';
import { GET_SUFFIX } from '../CodeEditor/CodeEditor/get-suffix';
import ConvertOptions from '../ConvertOptions/ConvertOptions';
import styles from './ConvertScreen.module.scss';
import { GET_LANGUAGES } from './get-languages';
class ConvertScreen extends Component {
  state = {
    parsers: [],
    dumpers: [],
    suffixOptions: []
  };

  componentDidMount() {
    this.props.convertEnum();
    this.getLanguagesOptions();
    this.loadSuffixOptions();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.configuration !== prevProps.configuration ||
      this.props.source !== prevProps.source
    ) {
      this.props.convertEnum();
    }
  }

  async loadSuffixOptions() {
    const { client } = this.props;
    const {
      data: { languageSuffix }
    } = await client.query({ query: GET_SUFFIX });
    this.setState({ suffixOptions: languageSuffix });
  }

  async getLanguagesOptions() {
    const { client } = this.props;
    const {
      data: { parsers, dumpers }
    } = await client.query({ query: GET_LANGUAGES });
    this.setState({ parsers, dumpers });
  }

  render() {
    const { parsers, dumpers, suffixOptions } = this.state;

    return (
      <div className={styles.root}>
        <ConvertOptions />
        <main className={styles.main}>
          <div className={styles.codeEditor}>
            <CodeEditor
              code={this.props.source}
              language={this.props.configuration.from}
              languageOptions={parsers}
              suffixOptions={suffixOptions}
              onCodeChange={event => this.props.changeSource(event)}
              onLanguageChange={event =>
                this.props.changeConfiguration({ from: event })
              }
              showError={this.props.isError}
              showClear
              showUpload
            />
          </div>
          <div className={styles.separator}>
            <IconButton onClick={this.handleTestMe}>
              <Hidden smDown>
                <KeyboardArrowRight />
              </Hidden>
              <Hidden mdUp>
                <KeyboardArrowDown />
              </Hidden>
            </IconButton>
          </div>
          <div className={styles.codeEditor}>
            <CodeEditor
              code={this.props.destination}
              language={this.props.configuration.to}
              languageOptions={dumpers}
              suffixOptions={suffixOptions}
              onLanguageChange={event =>
                this.props.changeConfiguration({ to: event })
              }
              showDownload
            />
          </div>
        </main>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  source: state.source,
  destination: state.destination,
  configuration: state.configuration,
  isError: state.isError
});
const mapDispatchToProps = {
  changeSource,
  changeConfiguration,
  convertEnum
};

export default compose(
  withApollo,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ConvertScreen);
