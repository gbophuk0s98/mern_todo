import React, { useContext, useState, useEffect } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from '../../context/auth.context'

import './todo-list-item.css'

export const TodoListItem = ({ text, done, important, onDeleted, onToggleDone, onToggleImportant}) =>{

    const [classes, setClasses] = useState('')

    const addClasses = () => {
        let clazz = 'todo-list-item d-flex justify-content-between'
        if (done) clazz += ' done'
        if (important) clazz += ' important'
        setClasses(clazz)
    }

    useEffect(() => {
        addClasses()
    }, [addClasses])


    return (
        <span className={classes}>
            <div className="task-text">
            <span
                className="todo-list-item-label"
                onClick={onToggleDone}
            >
                {text}
            </span>
            </div>

            <div className="task-btn">
            <button 
                type="button"
                className="btn btn-outline-success btn-sm"
                data-tooltip="Пометить как важное"
                onClick={onToggleImportant}
            >
                <i className="fa fa-exclamation" />
            </button>

            <button 
                type="button"
                className="btn btn-outline-danger btn-sm"
                data-tooltip="Удалить"
                onClick={onDeleted}
            >
                <i className="fa fa-trash-o" />
            </button>
            </div>

        </span>
    )
}