import React from 'react'

import './todo-list.css'
import {TodoListItem} from '../todo-list-item/todo-list-item'

export const ToDoList = ({todos, onDeleted, onToggleDone, onToggleImportant}) => {


    return(
        <ul className="list-group todo-list">
            {
                todos.map(item => {

                    return(
                        <li key={item._id} className="list-group-item d-flex">
                            <TodoListItem 
                                { ...item }
                                // onDeleted={() => onDeleted(id)}
                                // onToggleDone={() => onToggleDone(id)}
                                // onToggleImportant={() => onToggleImportant(id)}
                            />
                        </li>
                    )
                })
            }
        </ul>
    )
}