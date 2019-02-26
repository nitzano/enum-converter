import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, { Component } from 'react';

const styles = {
  select: {
    // flexGrow: 1,
    textAlign: 'center'
  }
};

class Languages extends Component {
  handleSelectChange = event => {
    this.props.onChange && this.props.onChange(event.target.value);
  };

  render() {
    const { value, languages, classes } = this.props;

    return (
      <Select
        className={classes.select}
        value={value}
        onChange={this.handleSelectChange}
      >
        {Object.entries(languages).map(([label, value]) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
    );
  }
}

Languages.propTypes = {
  value: PropTypes.string.isRequired,
  languages: PropTypes.object.isRequired,
  onChange: PropTypes.func
};

export default withStyles(styles)(Languages);
