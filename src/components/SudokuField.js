import React, { Component } from "react";

export default class SudokuField extends Component {
  handleChange = (e) => {
    const value = e.target.value === "" ? "" : parseInt(e.target.value, 10);
    // this.props.field.value = value
    this.props.onChange({ field: this.props.field, value });
  };

  render() {
    const { field } = this.props;
    return (
      <input
        type="text"
        className="field"
        readOnly={field.readonly}
        onChange={this.handleChange}
        value={field.value}
      />
    );
  }
}
