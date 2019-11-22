import React, { Component } from "react"
import "../App.css"
import Keyboard from "../Keyboard"
import CurrentWord from "../CurrentWord"
import Heart from "../Heart"
import App from "../App"

class Cite extends Component {
    //Le state avec toutes les propriétés nécessaires au composant
    state = {
        //liste de mots
        wordCollection: [
            "wesh",
            "racli",
            "narvalo",
            "zeref",
            "natchave",
            "miskine",
            "tchoin",
            "mamene",
            "askip",
            "balek",
            "belek",
            "wallah",
            "bail",
            "balnave",
            "bled",
            "bourbier"
        ],
        //liste de mots
        explicationWordCollection: [
            'Salut ou provocation appartenant au vocabulaire des jeunes. "Wesh" est dérivé de l\'arabe "wesh rak" (comment vas-tu ?). Son utilisation peut aussi être doublée : wesh-wesh.',

            "Racli est le féminin de raclo, qui désigne un garçon. Une racli est donc une fille.",

            'Même si "narvalo" signifie "narval (animal marin), de nos jours, narvalo signifie plus fou, marginal ou encore "type" pour désigner un homme.',

            "Je suis « zéref » ou « il m’a zerfé » vous dira un jeune très en colère ou irrité par quelqu’un d’autre. Cela vient de l’arabe z’âaf.",

            "Natchave, en argot manouche, veut dire s'évader, partir, s'enfuir… C'est surtout le nom du premier roman de Frank Henry, ancien membre du Gang des postiches et qui s'est découvert une passion pour l'écriture",

            "Miskine est un mot d'origine arabe qui pourrait être traduit par \"pauvre'.À l'origine, il est utilisé pour signifier la tristesse et la désolation dans laquelle se trouve une personne.",

            "Tchoin est un terme utilisé en Côte d'Ivoire pour désigner une prostituée ou une femme qui se donne facilement aux hommes. Le mot implique en général que ladite femme assume totalement le fait d'être facile.",

            "Mamène est un anglicisme formé à partir des mots my et man, qui signifie mon pote, mon gars ou mon ami. Exemple : Hey mamène ! Tu nous rejoins quand t'es dispo, on t'attend au QG avec Max, Will et les autres !",

            "Askip est la contraction de l'expression « à ce qu'il paraît », qui signifie « à ce qu'il se dit », « apparemment ».",

            "Veut dire que l'on s'en fiche,s'en bat les couilles.",

            'Belek est un mot arabe qui veut dire "attention". On dit souvent fait belek.',

            'Interjection souvent utilisée pour souligner la véracité de ses propos. Ce mot provient de l\'arabe "w\'Allah" signifiant entre autre l\'appel à Dieu pour témoigner.Un interlocuteur disant "wallah" assurer donc "devant Dieu" que ses dires sont véridiques.',

            "Mot de substitution permettant de désigner une chose sans la nommer (chose, truc, machin...).",

            "Mensonge. Arrête tes balnaves, y a plus personne qui te croie !",

            "En argot français, un bled est un petit village, avec connotation péjorative de lieu perdu, sans intérêt.",

            "Situation très difficile, fâcheuse."
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
        levelType: "cite"
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
                {this.state.levelType === "cite" ? (
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

                        {this.state.currentWord === null && <h1>CITÉ</h1>}
                        {this.state.currentWord === null && (
                            <p className="descriptionMode">
                                Wesh gros, bienvenue dans le mode cité. Frère,
                                si tu réussis ce jeu du pendu, on te file un
                                grec dans le bloc 7 de Sevran. Que la graille
                                soit avec toi.
                            </p>
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

                        {//Nouvelle partie
                        this.state.currentWord === null && (
                            <button
                                id="play_new_game"
                                onClick={() => this.launchNewGame()}
                            >
                                NOUVELLE PARTIE
                            </button>
                        )}
                        {//RMots suivant
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
            </div>
        )
    }
}

export default Cite
