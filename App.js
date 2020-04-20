import React, { Component } from "react"
import "./App.css"
import Hardcore from "./levels/Hardcore"
import Cite from "./levels/Cite"
import Bddi from "./levels/Bddi"
import Personnalise from "./levels/Personnalise"

import ClassProvider from "./levels/provider/provider"
import Context from "./levels/provider/context"

let showWave = true
class App extends Component {
    constructor(props) {
        super(props)

        this.state = {
            levelType: null
        }
    }

    handleClick(levelType) {
        this.setState({
            levelType
        })
    }

    render() {
        return (
            (this.state.levelType == null ? (
                <ClassProvider>
                    <div className="modeJeu">
                        <h1>JEU DU PENDU</h1>
                        <h3>Modes de jeu</h3>
                        <br />

                        <Context.Consumer>
                            {({ test }) => <p>{test}</p>}
                        </Context.Consumer>

                        <br />
                        <div className="container">
                            <button
                                className="btn btn-white btn-animation-1"
                                onClick={() => this.handleClick("hardcore")}
                            >
                                DIFFICILE
                            </button>
                            <button
                                className="btn"
                                onClick={() => this.handleClick("cite")}
                            >
                                CITÉ
                            </button>
                            <button
                                className="btn"
                                onClick={() => this.handleClick("bddi")}
                            >
                                BDDI
                            </button>
                            <button
                                className="btn"
                                onClick={() => this.handleClick("personnalise")}
                            >
                                PERSONNALISÉ
                            </button>
                        </div>

                        {showWave === true && (
                            <div class="ocean">
                                <div class="wave"></div>
                                <div class="wave"></div>
                            </div>
                        )}
                    </div>
                </ClassProvider>
            ) : null) ||
            (this.state.levelType === "hardcore" ? (
                <ClassProvider>
                    <Hardcore />
                </ClassProvider>
            ) : null) ||
            (this.state.levelType === "cite" ? (
                <ClassProvider>
                    <Cite />
                </ClassProvider>
            ) : null) ||
            (this.state.levelType === "bddi" ? (
                <ClassProvider>
                    <Bddi />
                </ClassProvider>
            ) : null) ||
            (this.state.levelType === "personnalise" ? (
                <ClassProvider>
                    <Personnalise />
                </ClassProvider>
            ) : null)
        )
    }
}

export default App
