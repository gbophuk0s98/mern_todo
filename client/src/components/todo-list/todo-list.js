import React, { useState, useContext, useEffect, useCallback } from 'react'
import { useHttp } from '../../hooks/http.hook'
import { AuthContext } from '../../context/auth.context'
import { TodoListItem } from '../todo-list-item/todo-list-item'
import './todo-list.css'

export const ToDoList = ({ id, onDeleted, onToggleDone, onToggleImportant }) => {

    const [cardId, setCardId] = useState(id)
    const [todos, setTodos] = useState([])
    const auth = useContext(AuthContext)
    const { request } = useHttp()

    const fetchedTodos = useCallback(async () => {
        try{
            const fetched = await request('/api/todos/getCardTodo', 'POST', {cardId}, {
                Authorization: `Bearer ${auth.token}`,
                User: `Id ${auth.userId}`
            })
            setTodos(fetched)
        }
        catch (e) {}
    }, [auth.token, auth.userId, cardId, request])

    // useEffect(() => {
    //     fetchedTodos()
    // }, [])

    useEffect(() => {
        fetchedTodos()
    }, [fetchedTodos])

    return(
        <ul className="list-group todo-list">
            {
                todos.map((item) => {
                    return(
                        <li key={item._id} className="list-group-item bg-dark">
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