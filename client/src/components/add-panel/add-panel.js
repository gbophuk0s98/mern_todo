import React from 'react'
import './add-panel.css'

export const AddPanel = ({ changeTodo, addTodo}) => {

    const clearInput = () => {
        document.getElementById("textInput").value = ''
    }

    return(
        <div className="w-auto">
            <div className="top-panel d-flex justify-content-between card-footer">
                <input
                    name="text"
                    className="add-input"
                    placeholder="Введите задачу..."
                    id="textInput"
                    onChange={(e) => {
                        changeTodo(e.target.name, e.target.value)
                    }}
                />
                <button 
                    type="button"
                    className="btn btn-primary circle-btn"
                    onClick={addTodo}
                >
                    <span>+</span>
                </button>
            </div>
        </div>
    )

}