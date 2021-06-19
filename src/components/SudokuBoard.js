import React, { Component } from 'react'
import SudokuField from "./SudokuField"
export default class SudokuBoard extends Component {
    updateValue = ({field , value} ) =>{
        // const su
        // const {sudoku}  =  this.props;
        // sudoku.rows[field.row].cols[field.col].value = value 
        // this.props.updateSudoku(sudoku)
        this.props.updateSudoku({field , value})
    }
    render() {
        return (
            <div>
                {this.props.sudoku.rows.map(row => (
                    <div className="row" key={row.index}>
                        {
                            row.cols.map(field => <SudokuField field={field} onChange={this.updateValue} key={field.col}/>)
                        }
                    </div>   

                ))}
            </div>
        )
    }
}
