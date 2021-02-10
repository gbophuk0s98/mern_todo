import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../../context/auth.context'
import { useHttp } from '../../hooks/http.hook'
import './add-panel.css'

export const AddPanel = ({ id }) => {

    const [cardId, setCardId] = useState(id)
    const [note, setNote] = useState({
        idCard: id, text: '', important: false, done: false,
    })
    const auth = useContext(AuthContext)
    const { request, loading } = useHttp()

    const onChangeNewTodo = event => {
        setNote({
            ...note,
            [event.target.name]: event.target.value
        })
    }

    const addTodo = async () => {
        await request('/api/todos/createTodo', 'POST', { ...note }, {
            Authorization: `Bearer ${auth.token}`,
            User: `Id ${auth.userId}`
        })
        console.log(note)
    } 

    const clearInput = () => {
        document.getElementById(id).value = ''
    }

    return(
        <div className="w-auto">
            <div className="top-panel d-flex justify-content-between card-footer">
                <input
                    name="text"
                    className="add-input"
                    placeholder="Введите задачу..."
                    id={cardId}
                    onChange={onChangeNewTodo}
                />
                <button 
                    type="button"
                    id={cardId}
                    className="btn btn-primary circle-btn"
                    onClick={() => {
                        addTodo()
                        clearInput()
                    }}
                >
                    <span>+</span>
                </button>
            </div>
        </div>
    )

}