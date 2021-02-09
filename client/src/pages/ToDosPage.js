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
    const [filterValue, setFilterValue] = useState('all')
    const [countToDo, setCountToDo] = useState(0)
    const [countDone, setCountDone] = useState(0)
    const [visibleItems, setVisibleItems] = useState([])

    const { request, loading } = useHttp()
    const { token, userId } = useContext(AuthContext)


    const getLenghtToDo = () => {
        const newArray = todo.filter((item) => {
            if (!item.done) return true
            return false
        })
        return newArray.length
    }

    const getLenghtDone = () => {
        const newArray = todo.filter((item) => {
            if (item.done) return true
            return false
        })
        return newArray.length
    }

    const search = (items, term) => {
        if (term.length === 0){
            return items
        }
        return items.filter((item) => {
            return item.text.toLowerCase().indexOf(term.toLowerCase()) > -1
        })
    }
    

    const filter = (items, filter) => {
        switch (filter) {
            case 'all': return items
            case 'active': return items.filter(item => !item.done)
            case 'done': return items.filter(item => item.done)
            default: return items
        }
    }

    const onSearchChange = (term) => {
        setTerm(term)
        setVisibleItems(filter(search(todo, term), filterValue))
    }

    const onFilterChange = (filterValue) => {
        setFilterValue(filterValue)
        setVisibleItems(filter((search(todo, term)), filterValue))
    }

    const onChangeNewTodo = (key, value) => {
        setNote({
            ...note,
            [key]: value
        })
    }

    const createHandler = async () => {
        try
        {
            await request('api/todos/create', 'POST', { ...note }, {
                Authorization: `Bearer ${token}`,
                User: `Id ${userId}`
            })
            setFilterValue('all')
            fetchedTodos()
        }
        catch (e) {}
    }

    const deleteHandler = async (_id) => {
        try
        {
            await request('/api/todos/delete', 'DELETE', {_id}, {
                Authorization: `Bearer ${token}`,
                User: `Id ${userId}`
            })
            fetchedTodos()
        }
        catch (e) {}
        
    }

    const changeDone = async (done, _id) => {
        await request('/api/todos/updateDone', 'PUT', {done, _id}, {
            Authorization: `Bearer ${token}`,
            User: `Id ${userId}`
        })
        fetchedTodos()
    }

    const changeImportant = async (important, _id) => {
        await request('/api/todos/updateImportant', 'PUT', {important, _id}, {
            Authorization: `Bearer ${token}`,
            User: `Id ${userId}`
        })
        fetchedTodos()
    }

    const fetchedTodos = useCallback(async () => {
        try
        {
            const fetched = await request('/api/todos/all', 'GET', null, {
                Authorization: `Bearer ${token}`,
                User: `Id ${userId}`
            })
            setTodo(fetched)
            setVisibleItems(fetched)
        }
        catch (e) {}
    }, [token, userId, request])

    useEffect(() => {
        fetchedTodos()
    }, [fetchedTodos])
    
    useEffect(() => {
        setCountToDo(getLenghtToDo())
    }, [getLenghtToDo, setCountToDo])

    useEffect(() => {
        setCountDone(getLenghtDone())
    }, [setCountDone, getLenghtDone])

    if (loading){
        return(
            <div style={{height: 500 + 'px'}} className="container w-50 mh-100">
                <div className="d-flex align-items-center justify-content-center h-100">
                    <div style={{ height: 50 + 'px', width: 50 + 'px' }} className="spinner-border text-primary" role="status">
                        <span className="sr-only">Загрузка...</span>
                    </div>
                </div>
            </div>
        )
    }

    return(
        <div className="">
            <div className="container m-auto w-50">
                <AppHeader 
                    toDo={countToDo} 
                    done={countDone}
                />
                <div className="top-panel d-flex">
                    <SearchPanel 
                        onSearchChange={onSearchChange}
                    />
                    <ItemStatusFilter 
                        filter={filterValue}
                        onFilterChange={onFilterChange}
                    />
                </div>
                <ToDoList
                        todos={visibleItems}
                        onDeleted={deleteHandler}
                        onToggleDone= {changeDone}
                        onToggleImportant= {changeImportant}
                />
                <AddPanel
                    changeTodo={onChangeNewTodo}
                    createTodo={createHandler}
                />
            </div>
        </div>
    )
    
}