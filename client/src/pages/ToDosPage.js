import React, { useState, useEffect, useContext, useCallback } from 'react'
import { AppHeader } from '../components/app-header/app-header'
import { SearchPanel } from '../components/search-panel/search-panel'
import { ItemStatusFilter } from '../components/item-status-filter/item-status-filter'
import { ToDoList } from '../components/todo-list/todo-list'
import { AddPanel } from '../components/add-panel/add-panel'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/auth.context'

export const ToDosPage = () => {
    
    const [todo, setTodo] = useState([])
    const [note, setNote] = useState({
        text: '', important: false, done: false,
    })
    const [term, setTerm] = useState('')
    const [filter, setFilter] = useState('all')
    const [countToDo, setCountToDo] = useState(0)
    const [countDone, setCountDone] = useState(0)
    const { request } = useHttp()
    const { token } = useContext(AuthContext)

    const onSearchChange = async (term) => {
        setTerm(term)
    }

    const onAddToDoChange = (key, value) => {
        setNote({
            ...note,
            [key]: value
        })
    }

    const createHandler = async () => {
        try
        {
            await request('api/todos/create', 'POST', { ...note }, {
                Authorization: `Bearer ${token}`
            })
            
        }
        catch (e) {}
    }

    const fetchedTodos = useCallback(async () => {
        try
        {
            const fetched = await request('/api/todos/all', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setTodo(fetched)
        }
        catch (e) {}

    }, [token, request])

    useEffect(async () => {
        fetchedTodos()
    }, [fetchedTodos, createHandler])



    return(
        <div className="container m-auto">
        <div className="mw-500">
            <AppHeader 
                toDo={countToDo} 
                done={countDone}
            />
            <div className="top-panel d-flex">
                <SearchPanel 
                    onSearchChange={onSearchChange}
                />
                <ItemStatusFilter 
                    filter={filter}
                    // onFilterChange={this.onFilterChange}
                />
            </div>
            <ToDoList 
                todos={todo}
                // onDeleted={this.deleteItem}
                // onToggleDone= {this.onToggleDone}
                // onToggleImportant= {this.onToggleImportant}
            />
            <AddPanel
                todo={todo}
                addTodo={onAddToDoChange}
                createTodo={createHandler}
                // count={todoData.length}
            />
        </div>
    </div>
    )
}