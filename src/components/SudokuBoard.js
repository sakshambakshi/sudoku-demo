import React, { Component } from 'react'
import SudokuField from "./SudokuField"
export default class SudokuBoard extends Component {
    constructor(props){
        super(props)
        const {sudoku } = props ;
    }
    render() {
        return (
            <div>
                {this.props.sudoku.rows.map(row => (
                    <div className="row" key={row.index}>
                        {
                            row.cols.map(field => <SudokuField field={field} key={field.col}/>)
                        }
                    </div>   

                ))}
            </div>
        )
    }
}
