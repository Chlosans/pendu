import React from 'react'

import Context from './context.js'

class ClassProvider extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            arrayWorld: ['test'],
            attempt: 0,
            fillArray: this.fillArray,
            estrempli : false
        }
    }

    fillArray = (value, attempt) => {
        let split = value.split(',')

        this.setState({arrayWorld: split, attempt: attempt, estrempli:true})
    }

    render() {
        return (
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export default ClassProvider