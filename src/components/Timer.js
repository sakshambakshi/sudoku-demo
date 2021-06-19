import React, { Component } from 'react'

export default class Timer extends Component {
    constructor(props){
        super(props)
        this.state = {
            elapsed:0
        }
    }

    componentDidMount(){
        this.interval = setInterval(() =>{
            this.setState({
                elapsed: Math.floor(((new Date ()).getTime() - this.props.startTime.getTime()) / 1000)
            })
            
        } , 1000)
    }
    componentWillUnmount(){
        delete this.interval
    }

    render() {
        return (
            <h2>Timer: {this.state.elapsed}</h2>
        )
    }
}
