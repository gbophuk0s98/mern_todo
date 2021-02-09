import React, { useState, useEffect, useContext, useCallback } from 'react'
import { AppHeader } from '../components/app-header/app-header'
import { SearchPanel } from '../components/search-panel/search-panel'
import { ItemStatusFilter } from '../components/item-status-filter/item-status-filter'
import { ToDoList } from '../components/todo-list/todo-list'
import { AddPanel } from '../components/add-panel/add-panel'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/auth.context'
import { Preloader } from '../components/preloader/preloader'

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
    const [localLoading, setLocalLoading] = useState(false)

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
        setLocalLoading(true)
        switch (filter) {
            case 'all':
                items = items
                break
            case 'active': 
                items = items.filter(item => !item.done)
                break
            case 'done':
                items = items.filter(item => item.done)
                break
            default: 
                items = items
                break
        }
        setLocalLoading(false)
        return items
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

    if (loading || localLoading) return <Preloader />


    return(
        <div className="">
            <div className="container m-auto w-75">
                {/* <AppHeader 
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
                /> */}
                <div className="card" style={{width: 18 + 'rem', marginTop: 50 + 'px', color: 'black'}}>
                    <div className="card-body">
                        <h5 className="card-title">Название карточки</h5>
                        <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Cras justo odio</li>
                        <li className="list-group-item">Dapibus ac facilisis in</li>
                        <li className="list-group-item">Vestibulum at eros</li>
                    </ul>
                    <div className="card-body">
                        <a href="#" className="card-link">Card link</a>
                        <a href="#" className="card-link">Another link</a>
                    </div>
                </div>
            </div>
        </div>
    )
    
}