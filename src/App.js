import React, { Component } from "react";
import "./App.css";
import generator from "sudoku";
import SudokuBoard from "./components/SudokuBoard"
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
  console.log(raw);
  const result = { rows: [] };
  for (let i = 0; i < 9; i++) {
    const row = { cols: [], index: i };
    for (let j = 0; j < 9; j++) {
      const col = {
        row: i,
        col: j,
        value: raw[i * 9 + j] !== null ? raw[i * 9 + j]  + 1 : ''  ,
        readonly: raw[i * 9 + j] !== null,
      };
      row.cols.push(col);
    }
    result.rows.push(row);
  }
  console.log({ result });
  return result;
}
generateSudoku();
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sudoku: generateSudoku(),
    };
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1>Sudoku Demo</h1>
        </header>

        <SudokuBoard sudoku={this.state.sudoku} />
      </div>
    );
  }
}

export default App;
