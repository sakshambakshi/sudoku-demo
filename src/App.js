import React, { Component } from "react";
import "./App.css";
import generator from "sudoku";
import SudokuBoard from "./components/SudokuBoard";
// import Timer from "./components/Timer";
import produce from "immer";
// this library provide utils for sudoku keep in mind it gives 0 - 8 rather that 1 - 8
window.generator = generator; // done for testing

/**
 * Generate a Sudoku   with the structure 
 * 
 * 


   {rows:[
     {cols: [
       {row:0 , col:0 value:1, readonly:true }
     ]}
   ]}
 */

function generateSudoku() {
  //Create a fuction that generate the sudoku board for you .
  const raw = generator.makepuzzle();
  const result = { rows: [] };
  result.solution = generator.solvepuzzle(raw).map((e) => e + 1);
  for (let i = 0; i < 9; i++) {
    const row = { cols: [], index: i };
    for (let j = 0; j < 9; j++) {
      const col = {
        row: i,
        col: j,
        value: raw[i * 9 + j] !== null ? raw[i * 9 + j] + 1 : "",
        readonly: raw[i * 9 + j] !== null,
      };
      row.cols.push(col);
    }
    result.rows.push(row);
  }
  result.startTime = new Date();
  result.solvedTime = null;
  return result;
}
// generateSudoku();

function checkSolution(sudoku) {
  
  const candidate = sudoku.rows
    .map((row) => row.cols.map(({ value }) => value))
    .flat();
  for (let i = 0; i < candidate.length; i++) {
    if (candidate[i] === "" || sudoku.solution[i] != candidate[i]) {
      return false;
    }
  }
  return true;
  
}
class App extends Component {
  constructor(props) {
    super(props);
    this.state = produce({}, () => ({
      sudoku: generateSudoku(),
    }));
    // checkSolution(this.state.sudoku)
  }
  checkSolution = () => {
    
    this.setState(
      produce((state) => {
        if (!state.sudoku.solvedTime) {
          const isSudokuSolved = checkSolution(state.sudoku);
          
          if (isSudokuSolved) {
            state.sudoku.solvedTime = new Date();
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
