import React, { Component } from "react";
import "./App.css";
import SudokuBoard from "./components/SudokuBoard";
// import Timer from "./components/Timer";
import produce from "immer"; // for updating state properly
import {generateSudoku,
  checkSolution , shareUrl } from "./lib/Sudoku"




class App extends Component {
  constructor(props) {
    super(props);
    this.state = produce({}, () => ({
      sudoku: generateSudoku(),
    }));
  }
  checkSolution = () => {
    
    this.setState(
      produce((state) => {
        if (!state.sudoku.solvedTime) {
          const isSudokuSolved = checkSolution(state.sudoku);
          
          if (isSudokuSolved) {
            state.sudoku.solvedTime = new Date();
            state.sudoku.shareUrl = shareUrl(state.sudoku)
            debugger
          }
        }
      })
    );
  };
  updateSudoku = ({ field, value }) => {
    // this.setState((state, props) => {
    //   return { ...state, sudoku: newSudoku };
    // });
    this.setState(
      produce((state) => {
        state.sudoku.rows[field.row].cols[field.col].value = value;
        
        if (!state.sudoku.solvedTime) {
          const isSudokuSolved = checkSolution(state.sudoku);
          
          if (isSudokuSolved) {
            state.sudoku.solvedTime = new Date();
            state.sudoku.shareUrl = shareUrl(state.sudoku)
            debugger
          }
        }
      })
    );
  };

  solveSudoku = () => {
    this.setState(
      produce((state) => {
        state.sudoku.rows.forEach((row) => {
          row.cols.forEach((col) => {
            if (!col.readonly) {
              col.value = state.sudoku.solution[col.row * 9 + col.col];
            }
          });
        });

        // this.updateSudoku()
      })
    );
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Sudoku Demo</h1>
        </header>
        <SudokuBoard
          sudoku={this.state.sudoku}
          updateSudoku={this.updateSudoku}
        />
        <button onClick={this.solveSudoku}>Solve</button>
        <button onClick={this.checkSolution}>Check</button>
      
      </div>
    );
  }
}

export default App;
