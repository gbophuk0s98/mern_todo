import React, { useState, useEffect, useContext, useCallback } from 'react'
import { AppHeader } from '../components/app-header/app-header'
import { SearchPanel } from '../components/search-panel/search-panel'
import { ItemStatusFilter } from '../components/item-status-filter/item-status-filter'
import { ToDoList } from '../components/todo-list/todo-list'
import { AddPanel } from '../components/add-panel/add-panel'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/auth.context'

export const ToDosPage = () => {
    
    const { request } = useHttp()
    const { token } = useContext(AuthContext)

    const [todo, setTodo] = useState([])
    const [note, setNote] = useState({
        text: '', important: false, done: false,
    })
    const [term, setTerm] = useState('')
    const [filterValue, setFilterValue] = useState('all')
    const [countToDo, setCountToDo] = useState(0)
    const [countDone, setCountDone] = useState(0)
    const [visibleItems, setVisibleItems] = useState([])
    const [filterResult, setFilterResult] = useState([])



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
        if (!term) setVisibleItems(todo)
        else setVisibleItems(search(todo, term))
    }

    const onFilterChange = async (filterValue) => {
        setFilterValue(filterValue)
        await filter(filterValue)
        setVisibleItems(filter(search(todo, term), filterValue))
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
                Authorization: `Bearer ${token}`
            })
            fetchedTodos()
        }
        catch (e) {}
    }

    const deleteHandler = async (_id) => {
        await request('/api/todos/delete', 'DELETE', {_id}, {
            Authorization: `Bearer ${token}`
        })
        fetchedTodos()
    }

    const changeDone = async (done, _id) => {
        await request('/api/todos/updateDone', 'PUT', {done, _id}, {
            Authorization: `Bearer ${token}`
        })
        fetchedTodos()
    }

    const changeImportant = async (important, _id) => {
        await request('/api/todos/updateImportant', 'PUT', {important, _id}, {
            Authorization: `Bearer ${token}`
        })
        fetchedTodos()
    }

    const fetchedTodos = useCallback(async () => {
        try
        {
            const fetched = await request('/api/todos/all', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            setTodo(fetched)
            setVisibleItems(fetched)
        }
        catch (e) {}
    }, [token, request])


    useEffect(async () => {
        await fetchedTodos()
    }, [fetchedTodos])
    
    useEffect(async () => {
        setCountToDo(getLenghtToDo())
        
    }, [getLenghtToDo, setCountToDo])

    useEffect(() => {
        setCountDone(getLenghtDone())
    }, [setCountDone, getLenghtDone])


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