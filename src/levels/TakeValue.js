import React, { Component } from 'react'
import '../App.css'

import Context from "./provider/context";

const regAcc = /[AZERTYUIOPQSDFGHJKLMWXCVBNÉÈÀÇéèàç'".;/:+=1234567890-]/

const initialState = {
    wordCollection: "",
    maxAttempt: "",
    hasError : false,
    messageError : "",

};

function reducer(state, action) {
// on ne fait que de la lecture sur le state pas autre chose
    const { wordCollection, maxAttempt } = state;
    switch (action.type) {
        case "wordCollection" :
            if( !regAcc.test(action.value) === false ) {
                return { ...state, hasError : true , messageError:"Pour la liste de mots, vous devez écrire les mots en minuscules et sans accents, ni caractères spéciaux."}
            }
            if(action.value ==="") return { ...state, [action.type] : ""}
            return { ...state, [action.type] : action.value, hasError : false }
        case "maxAttempt" :
            const { type, value } = action;
            if(value ==="") return { ...state, [type] : ""}
            const Value = parseInt(value);
            if( isNaN(Value) ) return { ...state, hasError : true,messageError: "Pour le nombre de tentatives, il faut un nombre." }
            return { ...state, [type] : Value, hasError : false }
        default:
            return state;
    }
}
const TakeValue = () => {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const { wordCollection, maxAttempt, hasError,messageError } = state;
    const handleChange = (e) => {
        const {name, value } = e.target;
        dispatch({
            type : `${name}`,  value
        })
    }
    return (
        <React.Fragment>
            {hasError === true && <p>{messageError}</p>}
            <div>
                <label>Votre liste de mots (séparer les mots par une virgule)
                    <input type="text" value={wordCollection} name="wordCollection" onChange={handleChange} />
                </label>
                <br />
                <label>Nombre de tentatives maximum
                    <input type="text" value={maxAttempt} name="maxAttempt" onChange={handleChange}  />
                </label>

                <Context.Consumer>
                    {({fillArray, attempt}) => (
                        <div>
                            <input type="submit" onClick={() => fillArray(state.wordCollection, state.maxAttempt)} value="submit"/>
                        </div>
                        )}
                </Context.Consumer>

            </div>
        </React.Fragment>
    );
}

export default TakeValue
