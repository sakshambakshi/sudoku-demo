import React, { Component } from "react";

export default class Result extends Component {
  render() {
    const { startTime } = this.props;
    const { solvedTime } = this.props;
    debugger;
    const timeToComplete = Math.floor(
      (solvedTime.getTime() - startTime.getTime()) / 1000
    );

    return (
      <React.Fragment>
        <h2>You Solved the Sudoku in {timeToComplete} seconds !!</h2>
        <div>
          Challenge a friend (or enemy):{" "}
          <a
            rel="noopener noreferrer"
            href={this.props.sudoku.shareUrl}
            target="_blank"
          >
            Share Link
          </a>
        </div>
      </React.Fragment>
    );
  }
}
