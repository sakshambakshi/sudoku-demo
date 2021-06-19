import React, { Component } from "react";
import SudokuField from "./SudokuField";
import Timer from "./Timer"
import Result from "./Result"
export default class SudokuBoard extends Component {
  updateValue = ({ field, value }) => {
    // const su
    // const {sudoku}  =  this.props;
    // sudoku.rows[field.row].cols[field.col].value = value
    // this.props.updateSudoku(sudoku)
    this.props.updateSudoku({ field, value });
  };
  render() {
    return (
      <div>
        {!this.props.sudoku.solvedTime && (
            <Timer startTime={this.props.sudoku.startTime} solvedTime={this.props.solvedTime} />
            ) }
        
        {this.props.sudoku.solvedTime && <Result startTime={this.props.sudoku.startTime} solvedTime={this.props.sudoku.solvedTime} sudoku={this.props.sudoku} />}
        {this.props.sudoku.challengeSolveTime && <h3>Your friend Solved in { Math.floor((new Date(this.props.sudoku.challengeSolveTime).getTime() -  new Date(this.props.sudoku.challengeStartTime).getTime())/1000) } seconds </h3>}
        {this.props.sudoku.rows.map((row) => (
          <div className="row" key={row.index}>
            {row.cols.map((field) => (
              <SudokuField
                field={field}
                onChange={this.updateValue}
                key={field.col}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}
