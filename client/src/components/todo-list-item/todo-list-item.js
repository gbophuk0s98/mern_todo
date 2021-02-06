import React, { useContext, useState, useEffect } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from '../../context/auth.context'

import './todo-list-item.css'

export const TodoListItem = ({ text, done, important, onDeleted, onToggleDone, onToggleImportant}) =>{

    const [classes, setClasses] = useState('')

    const addClasses = () => {
        let clazz = 'todo-list-item'
        if (done) clazz += ' done'
        if (important) clazz += ' important'
        setClasses(clazz)
    }

    useEffect(() => {
        addClasses()
    }, [addClasses])


    return (
        <span className={classes}>

            <span
                className="todo-list-item-label"
                onClick={onToggleDone}
            >
                {text}
            </span>

            <button 
                type="button"
                className="btn btn-outline-success btn-sm"
                onClick={onToggleImportant}
            >
                <i className="fa fa-exclamation" />
            </button>

            <button 
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={onDeleted}
            >
                <i className="fa fa-trash-o" />
            </button>

        </span>
    )
}