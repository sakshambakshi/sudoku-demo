import React, { Component } from 'react'

export default class SudokuField extends Component {
    render() {
        const {field} = this.props;
        return (
                
                <input type="text" className="field"  readOnly={field.readonly} value={field.value} />
               
        )   
    }
}
