import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import axios from 'axios';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  changeConfiguration,
  resetConfiguration
} from '../../actions/converter.actions';
import './ConvertOptions.scss';

class ConvertOptions extends Component {
  constructor(props) {
    super(props);

    this.state = { serverEnums: null };
  }

  static propTypes = {
    configuration: PropTypes.object
  };

  componentDidMount() {
    axios.get('/api/options/enums').then(resp => {
      this.setState({ serverEnums: resp.data });
    });
  }

  splitByCapital(str) {
    return str.split(/(?=[A-Z])/).join(' ');
  }

  renderDictionaryOptions(optionsDict) {
    let items = [
      <MenuItem key={null} value={undefined}>
        {' '}
      </MenuItem>
    ];

    if (optionsDict) {
      items.push(
        Object.entries(optionsDict).map(([label, value]) => (
          <MenuItem key={value} value={value}>
            {this.splitByCapital(label)}
          </MenuItem>
        ))
      );
    }

    return items;
  }

  renderEnumOrderOptions() {
    return this.renderDictionaryOptions(
      this.state.serverEnums && this.state.serverEnums.EnumsOrder
    );
  }

  renderValueOrderOptions() {
    return this.renderDictionaryOptions(
      this.state.serverEnums && this.state.serverEnums.ValuesOrder
    );
  }

  renderStringStyleOptions() {
    return this.renderDictionaryOptions(
      this.state.serverEnums && this.state.serverEnums.StringStyle
    );
  }

  changeConfiguration(changedOption) {
    this.props.changeConfiguration(changedOption);
  }

  render() {
    const configuration = this.props.configuration;

    return (
      <div className="ConvertOptions">
        <div className="ConvertOptions__buttons">
          <div className="reset-button">
            <Button
              variant="contained"
              color={'primary'}
              onClick={this.props.resetConfiguration}
            >
              Reset
            </Button>
          </div>
          <div className="emit-stats">
            <div>Emit Stats</div>
            <Switch
              checked={configuration.emitStats}
              onChange={(event, value) =>
                this.changeConfiguration({ emitStats: value })
              }
              inputProps={{
                id: 'emit-stats'
              }}
            />
          </div>
        </div>

        <form className="ConvertOptions__options">
          <FormControl className="option">
            <InputLabel htmlFor="sort-enums">Sort Enums</InputLabel>
            <Select
              value={configuration.sortEnums}
              onChange={(event, child) =>
                this.changeConfiguration({
                  sortEnums: event.target.value
                })
              }
              inputProps={{
                id: 'sort-enums'
              }}
            >
              {this.renderEnumOrderOptions()}
            </Select>
          </FormControl>
          <FormControl className="option">
            <InputLabel htmlFor="sort-values">Sort Values</InputLabel>
            <Select
              value={configuration.sortValues}
              onChange={(event, child) =>
                this.changeConfiguration({
                  sortValues: event.target.value
                })
              }
              inputProps={{
                id: 'sort-values'
              }}
            >
              {this.renderValueOrderOptions()}
            </Select>
          </FormControl>
          <FormControl className="option">
            <InputLabel htmlFor="name-style">Name Style</InputLabel>
            <Select
              className="style-option"
              value={configuration.nameStyle}
              onChange={(event, child) =>
                this.changeConfiguration({
                  nameStyle: event.target.value
                })
              }
              inputProps={{
                id: 'name-style'
              }}
            >
              {this.renderStringStyleOptions()}
            </Select>
          </FormControl>
          <FormControl className="option">
            <InputLabel htmlFor="key-style">Key Style</InputLabel>
            <Select
              value={configuration.keyStyle}
              onChange={(event, child) =>
                this.changeConfiguration({ keyStyle: event.target.value })
              }
              inputProps={{
                id: 'key-style'
              }}
            >
              {this.renderStringStyleOptions()}
            </Select>
          </FormControl>
          <FormControl className="option">
            <InputLabel htmlFor="value-style">Value Style</InputLabel>
            <Select
              value={configuration.valueStyle}
              onChange={(event, child) =>
                this.changeConfiguration({
                  valueStyle: event.target.value
                })
              }
              inputProps={{
                id: 'value-style'
              }}
            >
              {this.renderStringStyleOptions()}
            </Select>
          </FormControl>
        </form>

        {/*

        */}
      </div>
    );
  }
}

const mapStateToProps = state => ({ configuration: state.configuration });
const mapDispatchToProps = {
  changeConfiguration,
  resetConfiguration
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConvertOptions);
