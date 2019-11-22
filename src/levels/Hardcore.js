import React, { Component } from "react"
import "../App.css"
import Keyboard from "../Keyboard"
import CurrentWord from "../CurrentWord"
import Heart from "../Heart"
import App from "../App"

let showWave = false
class Hardcore extends Component {
    //Le state avec toutes les propriétés nécessaires au composant
    state = {
        //liste de mots
        wordCollection: [
            "interdepartementalisation",
            "hexakosioihexekontahexaphobie",
            "glycosylphosphatidylethanolamine",
            "orthochlorobenzalmalonitrile",
            "dichlorodiphenyltrichloroethane",
            "aminomethylpyrimidinylhydroxyethylmethythiazolium",
            "hippopotomonstrosesquippedaliophobie",
            "cyclopentanoperhydrophenanthrene",
            "apopathodiaphulatophobie",
            "deconstitutionnaliseraient"
        ],
        //liste de mots
        explicationWordCollection: [
            "Le fait de rendre interdépartemental c'est à dire de concerner plus départements différents. 25 lettres",
            "Un très beau mot de 29 lettres pour désigner la phobie du nombre 666 (le chiffre de la Bête).",
            "Des membranes cellulaires , 32 lettres",
            "Un gaz suffocant utilisé pour disperser les émeutiers lors des manifestations qui dégénèrent. 30 lettres.",
            "Un insecticide très puissant de 31 lettres. Plus connu sous le nom de DDT.",
            "Le nom systématique de la vitame B2, 49 lettres.",
            "36 lettres (rien que ça), pour désigner la phobie des mots trop longs... Vous la sentez l'ironie là ?",
            "Un mot de 32 lettres qui permet de désigner un type de noyau qui entre dans la composition d'éléments biochimiques comme le cholestérol par exemple",
            "La phobie de la constipation. 24 lettres cette fois.",
            "La forme fléchie d'anticonstitutionnellement compte 26 lettres soit une de plus que le soi-disant mot le plus long de la langue française. Elle signifie enlever à un texte son caractère constitutionnel à la 3ème personne du pluriel du conditionnel présent."
        ],
        //La lettre sur lequel le joueur vient de cliquer
        currentWord: null,
        //Keyboard
        //La méthode split() permet de diviser une chaîne de caractères à partir d'un séparateur pour fournir un tableau de sous-chaînes.
        alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".toLowerCase().split(""),
        //Tableau qui garde en mémoire toutes les lettres sur lesquelles le joueur a cliqué
        usedLetter: [],
        //Résultat du jeu
        win: 0, // 0 : neutral | -1 lost | 1 win
        //Nombre de coups réalisé
        attempt: 0,
        //Nombre de coups maximum
        maxAttempt: 5,
        //Position dans le site
        levelType: "hardcore"
    }

    componentDidMount() {
        window.addEventListener("keyup", e => {
            //Keycode = 13 = le bouton enter
            //Au bouton enter : une nouvelle partie commence
            if (e.keyCode === 13) {
                this.launchNewGame()
            }
        })
    }

    clickLetter = letter => {
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
            let win = 1
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
        this.randomIndex = Math.floor(
            Math.random() * this.state.wordCollection.length
        )
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
                {this.state.levelType === "hardcore" ? (
                    <div id="game">
                        <button
                            className="btnAccueil"
                            onClick={() => this.homePage("App")}
                        >
                            ACCUEIL
                        </button>

                        {//Nombre de vies
                        this.state.currentWord !== null && (
                            <Heart
                                attempt={this.state.attempt}
                                maxAttempt={this.state.maxAttempt}
                            />
                        )}

                        {//Le mot à découvrir
                        this.state.currentWord !== null && (
                            <CurrentWord
                                currentWord={this.state.currentWord}
                                usedLetter={this.state.usedLetter}
                                win={this.state.win}
                            />
                        )}

                        {//KEYBOARD
                        this.state.win === 0 &&
                            this.state.currentWord !== null && (
                                <Keyboard
                                    alphabet={this.state.alphabet}
                                    usedLetter={this.state.usedLetter}
                                    action={this.clickLetter}
                                />
                            )}

                        {//WIN MESSAGE
                        this.state.win === 1 && <p id="win_message">WIN !!!</p>}

                        {//LOST MESSAGE
                        this.state.win === -1 && (
                            <p id="lost_message">LOST !!!</p>
                        )}

                        {//explication mot
                        (this.state.win === 1 || this.state.win === -1) && (
                            <p id="explication_mot">
                                {
                                    this.state.explicationWordCollection[
                                        this.randomIndex
                                    ]
                                }
                            </p>
                        )}

                        {this.state.currentWord === null && <h1>DIFFICILE</h1>}
                        {this.state.currentWord === null && (
                            <p className="descriptionMode">
                                Cher visiteur de notre site, bienvenue dans le
                                mode Hardcore. Sachez que si vous réussissez ce
                                jeu du pendu, une place dans le paradis du monde
                                de la langue française vous sera attribué. Que
                                la culture soit avec vous.{" "}
                            </p>
                        )}

                        {//Nouvelle partie
                        this.state.currentWord === null && (
                            <button
                                id="play_new_game"
                                onClick={() => this.launchNewGame()}
                            >
                                NOUVELLE PARTIE
                            </button>
                        )}
                        {//Mots suivant
                        this.state.win !== 0 && (
                            <button
                                id="play_new_game"
                                onClick={() => this.launchNewGame()}
                            >
                                MOT SUIVANT
                            </button>
                        )}
                    </div>
                ) : (
                    <App />
                )}
                {showWave === false && (
                    <div class="ocean">
                        <div class="wave"></div>
                        <div class="wave"></div>
                    </div>
                )}
            </div>
        )
    }
}

export default Hardcore
