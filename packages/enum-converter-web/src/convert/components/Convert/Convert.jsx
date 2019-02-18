import React, { Component } from 'react';
import ConvertCode from '../ConvertCode/ConvertCode';
import ConvertOptions from '../ConvertOptions/ConvertOptions';
import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Hidden from '@material-ui/core/Hidden';
import { connect } from 'react-redux';
import {
  changeSource,
  changeConfiguration,
  convertEnum
} from '../../actions/converter.actions';
import './Convert.scss';

class Convert extends Component {
  componentDidMount() {
    this.props.convertEnum();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.configuration !== prevProps.configuration ||
      this.props.source !== prevProps.source
    ) {
      this.props.convertEnum();
    }
  }

  render() {
    return (
      <div className="Convert">
        <div className="Convert__options">
          <ConvertOptions />
        </div>
        <div className="Convert__main">
          <div className="Convert__code">
            <ConvertCode
              code={this.props.source}
              language={this.props.configuration.from}
              onCodeChange={event => this.props.changeSource(event)}
              onLanguageChange={event =>
                this.props.changeConfiguration({ from: event })
              }
              showError={this.props.isError}
              showClear
              showUpload
            />
          </div>
          <div className="Convert__sep">
            <IconButton onClick={this.handleTestMe}>
              <Hidden smDown>
                <KeyboardArrowRight />
              </Hidden>
              <Hidden mdUp>
                <KeyboardArrowDown />
              </Hidden>
            </IconButton>
          </div>
          <div className="Convert__code">
            <ConvertCode
              code={this.props.destination}
              language={this.props.configuration.to}
              onLanguageChange={event =>
                this.props.changeConfiguration({ to: event })
              }
              showDownload
            />
          </div>
        </div>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Convert);
