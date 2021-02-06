import React, { useContext } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from '../../context/auth.context'

import './todo-list-item.css'

export const TodoListItem = ({ _id, text, done, important}) =>{

    const { request } = useHttp()
    const { token } = useContext(AuthContext)

    const onLabelClick = () => {
        // this.props.onToggleDone()
    }

    const onExclamationClick = () => {
        // this.props.onToggleImportant()
    }

        // const { text, onDeleted, done, important } = this.props

        let classes = 'todo-list-item'
        // if (done) classes += ' done'
        // if (important) classes += ' important'

    const deleteHandler = async () => {
        await request('/api/todos/delete', 'DELETE', {_id}, {
            Authorization: `Bearer ${token}`
        })
    }

    return (
        <span className={classes}>

            <span
                className="todo-list-item-label"
                onClick={onLabelClick}
            >
                {text}
            </span>

            <button 
                type="button"
                className="btn btn-outline-success btn-sm"
                onClick={onExclamationClick}
            >
                <i className="fa fa-exclamation" />
            </button>

            <button 
                type="button"
                className="btn btn-outline-danger btn-sm"
                onClick={deleteHandler}
            >
                <i className="fa fa-trash-o" />
            </button>

        </span>
    )
}