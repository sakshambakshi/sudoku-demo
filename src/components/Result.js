import React, { Component } from 'react'

export default class Result extends Component {
    constructor(props){
        super(props)
    
    }
    render() {
        const {startTime} = this.props;
        const {solvedTime} = this.props
        debugger
        const timeToComplete = Math.floor((  solvedTime.getTime() - startTime.getTime()) / 1000)
            
        return (
            <h2>You Solved the Sudoku in {timeToComplete} seconds  !!</h2>

        )
    }
}
