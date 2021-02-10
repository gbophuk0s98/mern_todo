import React, { useContext } from 'react'
import './todo-list.css'
import { TodoListItem } from '../todo-list-item/todo-list-item'

export const ToDoList = ({todos, onDeleted, onToggleDone, onToggleImportant, createTodo}) => {

    return(
        <ul className="list-group todo-list">
            {
                todos.map((item, index) => {
                    return(
                        <li key={index} className="list-group-item bg-dark">
                            <TodoListItem 
                                { ...item }
                                // onDeleted={() => onDeleted(item._id)}
                                // onToggleDone={() => onToggleDone(item.done, index)}
                                // onToggleImportant={() => onToggleImportant(item.important, item._id)}
                            />
                        </li>
                    )
                })
            }
        </ul>
    )
}