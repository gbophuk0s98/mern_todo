import React from 'react'
import './add-panel.css'

export const AddPanel = ({ changeTodo, createTodo}) => {

    const clearInput = () => {
        document.getElementById("textInput").value = ''
    }

    return(
        <div className="top-panel d-flex">
            <input
                name="text"
                className="search-input"
                placeholder="Введите задачу..."
                id="textInput"
                onChange={(e) => {
                    changeTodo(e.target.name, e.target.value)
                }}
            />
            <button 
                type="button"
                className="btn btn-primary"
                onClick={() => {
                    createTodo()
                    clearInput()
                }}
            >
                Добавить
            </button>
        </div>
    )

}