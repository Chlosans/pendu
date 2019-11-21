import React, { Component } from 'react'
import '../App.css'
import Keyboard from "../Keyboard";
import CurrentWord from '../CurrentWord'
import Heart from '../Heart'
import App from "../App";

class Bddi extends Component {

    //Le state avec toutes les propriétés nécessaires au composant
    state = {
        //liste de mots
        wordCollection: ["republique ","biere","antoine","slack","mcdonalds","football",'rhinoshield'],
        explicationWordCollection :["Place à Paris où les BDDI se retrouvent pour jouir d’un happy hour du tonnerre de dieu.","Boisson alcoolisé prises par les étudiants de cette promotion de manière régulière.","Professeur présent durant 2 semaines consécutives pour l’apprentissage de React. XXXX, ça va ?","C’est le moyen de communication de notre promotion. ","Lieu de consommation excessivement gras mais pas cher grâce à une promotion : 2 bestOf pour le prix d’un ! PS : demander à Luc","Sport souvent pratiqué durant les pauses des développeurs","Coque de téléphone assez réputée pour sa solidité"],
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
        maxAttempt: 5,
        //Position dans le site
        levelType: "bddi",
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
            if (attempt >= this.state.maxAttempt && win === 0) {
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
    pickNewWord = () => {
        this.randomIndex = Math.floor(Math.random() * this.state.wordCollection.length)
        return this.state.wordCollection[this.randomIndex]

    }

    //Nouvelle partie
    launchNewGame = () => {

        this.setState({
            currentWord: this.pickNewWord(),
            usedLetter: [],
            win: 0,
            attempt: 0
        })

    }

    render() {
        return (
            <div>
                {this.state.levelType === "bddi" ? (
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
                                maxAttempt={this.state.maxAttempt}
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
                            //explication mot
                            (this.state.win === 1 || this.state.win === -1) &&
                            <p id="explication_mot">{this.state.explicationWordCollection[this.randomIndex]}</p>
                        }

                        {
                            (this.state.currentWord === null ) &&
                            <h3>BDDI</h3>

                        }
                        {
                            (this.state.currentWord === null) &&
                            <p>Explications du mode</p>

                        }

                        {
                            //Nouvelle partie
                            (this.state.currentWord === null ) &&
                            <button id="play_new_game" onClick={() => this.launchNewGame()}>Nouvelle partie</button>

                        }
                        {
                            //Mots suivant
                            (this.state.win !== 0) &&
                            <button id="play_new_game" onClick={() => this.launchNewGame()}>Mot suivant</button>

                        }
                    </div>
                ) : (<App/>)}
            </div>
        )
    }
}


export default Bddi;