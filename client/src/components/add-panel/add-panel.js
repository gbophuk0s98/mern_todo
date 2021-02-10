import React, { useState, useEffect } from 'react'
import './add-panel.css'

export const AddPanel = ({ id }) => {

    const [cardId, setCardId] = useState(id)
    const [note, setNote] = useState({
        text: '', important: false, done: false,
    })

    const onChangeNewTodo = event => {
        setNote({
            ...note,
            [event.target.name]: event.target.value
        })
        console.log(note)
    }

    const addTodo = () => {
        // console.log(cardId)
        console.log(cardId)
    } 

    const clearInput = () => {
        document.getElementById(id).value = ''
    }

    return(
        <div className="w-auto">
            <div className="top-panel d-flex justify-content-between card-footer">
                <input
                    name="text"
                    className="add-input"
                    placeholder="Введите задачу..."
                    id={cardId}
                    onChange={onChangeNewTodo}
                />
                <button 
                    type="button"
                    id={cardId}
                    className="btn btn-primary circle-btn"
                    onClick={addTodo}
                >
                    <span>+</span>
                </button>
            </div>
        </div>
    )

}