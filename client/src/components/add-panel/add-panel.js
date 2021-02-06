import React, { useState, useContext } from 'react'
import './add-panel.css'
import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from '../../context/auth.context'

export const AddPanel = ({ todo, addTodo, createTodo}) => {

    const { request, loading, error, clearError } = useHttp()
    const { token } = useContext(AuthContext)

    const clearInput = () => {
        document.getElementById("textInput").value = ''
    }

    const create = () => {
        createTodo()
    }

    const changeSearch = (event) => {
        addTodo(event.target.name, event.target.value)
    }


    return(
        <div className="top-panel d-flex">
            <input
                name="text"
                className="search-input"
                placeholder="add todo..."
                id="textInput"
                onChange={changeSearch}
            />
            <button 
                type="button"
                className="btn btn-primary"
                onClick={() => {
                    create()
                    clearInput()
                }}
            >
                Add todo
            </button>
        </div>
    )

}