import React, { Component } from 'react'
import './App.css'
import Hardcore from "./levels/Hardcore";
import Cite from "./levels/Cite";
import Bddi from "./levels/Bddi";
import Personnalise from "./levels/Personnalise";

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
            <div className="modeJeu">
              <h1>Jeu du pendu</h1>
              <h3>Modes de jeu</h3>
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
        ) : null) ||
        (this.state.levelType === "hardcore" ? (
            <Hardcore/>
        ) : null) ||
        (this.state.levelType === "cite" ? (
            <Cite/>
        ) : null) ||
        (this.state.levelType === "bddi" ? (
            <Bddi/>
        ) : null)||
        (this.state.levelType === "personnalise" ? (
            <Personnalise/>
        ) : null)
    )
  }
}


export default App;