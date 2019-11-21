import React, { Component } from 'react'
import '../App.css'
import Keyboard from "../Keyboard";
import CurrentWord from '../CurrentWord'
import Heart from '../Heart'
import App from "../App";
import TakeValue from "./TakeValue";

import Context from "./provider/context";

class Personnalise extends Component {

    static contextType = Context

    //Le state avec toutes les propriétés nécessaires au composant
    state = {
        //liste de mots
        wordCollection: "",
        //La lettre sur lequel le joueur vient de cliquer
        currentWord: null,
        //Keyboard
        //La méthode split() permet de diviser une chaîne de caractères à partir d'un séparateur pour fournir un tableau de sous-chaînes.
        alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase().split(''),
        //Tableau qui garde en mémoire toutes les lettres sur lesquelles le joueur a cliqué
        usedLetter: [],
        //Résultat du jeu
        win: 0, // 0 : neutral | -1 lost | 1 win
        //Nombre de coups réalisé
        attempt: 0,
        //Nombre de coups maximum
        maxAttempt: "",
        //Position dans le site
        levelType: "personnalise",
    }


    componentDidMount() {
        window.addEventListener("keyup", (e) => {
            //Keycode = 13 = le bouton enter
            //Au bouton enter : une nouvelle partie commence
            if (e.keyCode === 13) {
                this.launchNewGame()
            }
        })
    }


    clickLetter = (letter) => {

        //Si le tableau indexOf est pas vide
        if (this.state.usedLetter.indexOf(letter) === -1) {
            //Remplir la lettre de l'utilisateur (pour prévoir les clicks multiples sur une même lettre)
            const usedLetter = [letter, ...this.state.usedLetter]

            //calcul du nombre de coups
            let attempt = this.state.attempt
            //Si la lettre ne fait pas partie du mot à trouver : il y a un coup en plus
            if (this.state.currentWord.indexOf(letter) === -1) {
                attempt = this.state.attempt + 1
            }

            //calcul du résultat du jeu
            let win = 1;
            for (let i = 0; i < this.state.currentWord.length; i++) {
                //Dans la boucle, on passe par chaque lettre du mot. Si une lettre n'est pas dans le tableau le status du jeu reste neutre
                if (usedLetter.indexOf(this.state.currentWord[i]) === -1) {
                    win = 0
                }
            }

            //Si le nombre de coups est supérieur au nombre de coups max : le joueur a perdu
            if (attempt >= this.context.attempt && win === 0) {
                win = -1
            }

            //update state
            this.setState({ usedLetter, attempt, win })
        }

    }

    homePage(levelType) {
        this.setState({
            levelType
        })
    }

    //Choisir un mot aléatoirement dans la liste de mots
    pickNewWord = (value) => {
        const randomIndex = Math.floor(Math.random() * this.context.arrayWorld.length)
        return this.context.arrayWorld[randomIndex]

        console.log(value)
    }

    //Nouvelle partie
    launchNewGame = () => {

        this.setState({
            currentWord: this.pickNewWord('ok'),
            usedLetter: [],
            win: 0,
            attempt: 0
        })
    }

    componentDidUpdate() {

    }

    render() {
        return (
            <div>
                {this.state.levelType === "personnalise" ? (
                    <div id="game">
                        <button onClick={() => this.homePage("App")}>
                            Accueil
                        </button>
                        <h1>Jeu du pendu</h1>


                        {
                            //Nombre de vies
                            (this.state.currentWord !== null) &&
                            <Heart
                                attempt={this.state.attempt}
                                maxAttempt={this.context.attempt}
                            />
                        }

                        {
                            //Le mot à découvrir
                            (this.state.currentWord !== null) &&
                            <CurrentWord
                                currentWord={this.state.currentWord}
                                usedLetter={this.state.usedLetter}
                                win={this.state.win}
                            />
                        }

                        {
                            //KEYBOARD
                            (this.state.win === 0 && this.state.currentWord !== null) &&
                            <Keyboard
                                alphabet={this.state.alphabet}
                                usedLetter={this.state.usedLetter}
                                action={this.clickLetter}
                            />
                        }

                        {
                            //WIN MESSAGE
                            this.state.win === 1 &&
                            <p id="win_message">WIN !!!</p>
                        }

                        {
                            //LOST MESSAGE
                            this.state.win === -1 &&
                            <p id="lost_message">LOST !!!</p>
                        }

                        {
                            (this.state.currentWord === null ) &&
                            <h3>Personnalisé</h3>

                        }
                        {
                            (this.state.currentWord === null) &&
                            <p>Bonjour ! Bienvenue dans le mode Personnalisé. Dans ce mode, vous pouvez choisir les mots à trouver. Vous choisissez également le nombre de tentatives maximum possible.</p>

                        }
                        {
                            (this.state.currentWord === null) &&
                            <TakeValue/>
                        }

                        {
                            //Nouvelle partie
                            (this.state.currentWord === null && this.context.estrempli === true) &&
                            <button id="play_new_game" onClick={() => this.launchNewGame()}>Nouvelle partie</button>

                        }
                        {
                            //RMots suivant
                            (this.state.win !== 0) &&
                            <button id="play_new_game" onClick={() => this.launchNewGame()}>Mot suivant</button>

                        }
                    </div>
                ) : (<App/>)}
            </div>
        )
    }
}


export default Personnalise;