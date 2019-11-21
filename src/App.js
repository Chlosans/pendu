import React, { Component } from 'react'
import './App.css'
import Hardcore from "./levels/Hardcore";
import Cite from "./levels/Cite";
import Bddi from "./levels/Bddi";
import Personnalise from "./levels/Personnalise";

import ClassProvider from "./levels/provider/provider";
import Context from "./levels/provider/context";

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
                    <h1>Jeu du pendu</h1>
                    <h3>Modes de jeu</h3>

                    <Context.Consumer>
                        {({test}) => (<p>{test}</p>)}
                    </Context.Consumer>

                    <br />
                    <button onClick={() => this.handleClick("hardcore")}>
                        Hardcore
                    </button>
                    <button onClick={() => this.handleClick("cite")}>
                        Cité
                    </button>
                    <button onClick={() => this.handleClick("bddi")}>
                        BDDI
                    </button>
                    <button onClick={() => this.handleClick("personnalise")}>
                        Personnalisé
                    </button>
                </div>
            </ClassProvider>
        ) : null) ||
        (this.state.levelType === "hardcore" ? (
            <ClassProvider>
                <Hardcore/>
            </ClassProvider>
        ) : null) ||
        (this.state.levelType === "cite" ? (
            <ClassProvider>
                <Cite/>
            </ClassProvider>
        ) : null) ||
        (this.state.levelType === "bddi" ? (
            <ClassProvider>
                <Bddi/>
            </ClassProvider>
        ) : null)||
        (this.state.levelType === "personnalise" ? (
            <ClassProvider>
                <Personnalise/>
            </ClassProvider>
        ) : null)
    )
  }
}


export default App;