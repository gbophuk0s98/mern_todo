import React, { useContext } from 'react'
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
                                onDeleted={() => onDeleted(item._id)}
                                onToggleDone={() => onToggleDone(item.done, item._id)}
                                onToggleImportant={() => onToggleImportant(item.important, item._id)}
                            />
                        </li>
                    )
                })
            }
        </ul>
    )
}