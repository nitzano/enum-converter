import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { compose, withApollo } from 'react-apollo';
import { connect } from 'react-redux';
import {
  changeConfiguration,
  resetConfiguration
} from '../../actions/converter.actions';
import styles from './ConvertOptions.module.scss';
import { GET_OPTIONS } from './get-options';
class ConvertOptions extends Component {
  state = {
    enumsOrder: [],
    valuesOrder: [],
    stringStyles: []
  };

  componentDidMount() {
    this.getOptions();
  }

  async getOptions() {
    const {
      data: { enumsOrder, valuesOrder, stringStyles }
    } = await this.props.client.query({ query: GET_OPTIONS });
    this.setState({ enumsOrder, valuesOrder, stringStyles });
  }

  renderSelectOption(options) {
    let items = [
      <MenuItem key={null} value={undefined}>
        {' '}
      </MenuItem>
    ];

    if (options) {
      items.push(
        options.map(({ label, value }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))
      );
    }

    return items;
  }

  renderEnumOrderOptions() {
    return this.renderSelectOption(this.state.enumsOrder);
  }

  renderValueOrderOptions() {
    return this.renderSelectOption(this.state.valuesOrder);
  }

  renderStringStyleOptions() {
    return this.renderSelectOption(this.state.stringStyles);
  }

  changeConfiguration(changedOption) {
    this.props.changeConfiguration(changedOption);
  }

  render() {
    const configuration = this.props.configuration;

    return (
      <div className={styles.root}>
        <div className={styles.buttons}>
          <div className={styles.button}>
            <Button
              variant="contained"
              color={'primary'}
              onClick={this.props.resetConfiguration}
            >
              Reset
            </Button>
          </div>
          <div className={styles.button}>
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

        <form className={styles.options}>
          <FormControl className={styles.option}>
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
          <FormControl className={styles.option}>
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
          <FormControl className={styles.option}>
            <InputLabel htmlFor="name-style">Name Style</InputLabel>
            <Select
              className={styles.styleOption}
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
          <FormControl className={styles.option}>
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
          <FormControl className={styles.option}>
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
      </div>
    );
  }
}

ConvertOptions.propTypes = {
  configuration: PropTypes.object
};

const mapStateToProps = state => ({ configuration: state.configuration });
const mapDispatchToProps = {
  changeConfiguration,
  resetConfiguration
};
export default compose(
  withApollo,
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ConvertOptions);
