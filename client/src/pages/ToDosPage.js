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
    const [cards, setCards] = useState([])

    const { request, loading } = useHttp()
    const { token, userId } = useContext(AuthContext)


    // const getLenghtToDo = () => {
    //     const newArray = todo.filter((item) => {
    //         if (!item.done) return true
    //         return false
    //     })
    //     return newArray.length
    // }

    // const getLenghtDone = () => {
    //     const newArray = todo.filter((item) => {
    //         if (item.done) return true
    //         return false
    //     })
    //     return newArray.length
    // }

    // const search = (items, term) => {
    //     if (term.length === 0){
    //         return items
    //     }
    //     return items.filter((item) => {
    //         return item.text.toLowerCase().indexOf(term.toLowerCase()) > -1
    //     })
    // }
    

    // const filter = (items, filter) => {
    //     setLocalLoading(true)
    //     switch (filter) {
    //         case 'all':
    //             items = items
    //             break
    //         case 'active': 
    //             items = items.filter(item => !item.done)
    //             break
    //         case 'done':
    //             items = items.filter(item => item.done)
    //             break
    //         default: 
    //             items = items
    //             break
    //     }
    //     setLocalLoading(false)
    //     return items
    // }

    // const onSearchChange = (term) => {
    //     setTerm(term)
    //     setVisibleItems(filter(search(todo, term), filterValue))
    // }

    // const onFilterChange = (filterValue) => {
    //     setFilterValue(filterValue)
    //     setVisibleItems(filter((search(todo, term)), filterValue))
    // }

    // const onChangeNewTodo = (key, value) => {
    //     setNote({
    //         ...note,
    //         [key]: value
    //     })
    // }

    // const createHandler = async () => {
    //     try
    //     {
    //         await request('api/todos/create', 'POST', { ...note }, {
    //             Authorization: `Bearer ${token}`,
    //             User: `Id ${userId}`
    //         })
    //         setFilterValue('all')
    //         fetchedTodos()
    //     }
    //     catch (e) {}
    // }

    // const deleteHandler = async (_id) => {
    //     try
    //     {
    //         await request('/api/todos/delete', 'DELETE', {_id}, {
    //             Authorization: `Bearer ${token}`,
    //             User: `Id ${userId}`
    //         })
    //         fetchedTodos()
    //     }
    //     catch (e) {}
        
    // }

    // const changeDone = async (done, id) => {
    //     await request('/api/todos/updateDone', 'PUT', {done, id}, {
    //         Authorization: `Bearer ${token}`,
    //         User: `Id ${userId}`
    //     })
    //     fetchedCards()
    //     // console.log(id)
    //     // console.log('changeDone')
    // }

    // const changeImportant = async (important, _id) => {
    //     await request('/api/todos/updateImportant', 'PUT', {important, _id}, {
    //         Authorization: `Bearer ${token}`,
    //         User: `Id ${userId}`
    //     })
    //     fetchedTodos()
    // }

    const createCardHandler = async () => {
        const title = 'ЧЧЧЧ'
        const description = 'ЦЦЦЦЦЦ'
        const text = 'qwe'
        const tasks = [{done: false, important: false, text: 'ascasdchkhasdkjasdhkjas'}, {done: false, important: false, text: 'ascasdchkhasdkjasdhkjas'}, {done: false, important: false, text: 'ascasdchkhasdkjasdhkjas'}, {done: false, important: false, text: 'ascasdchkhasdkjasdhkjas'}, {done: false, important: false, text: 'ascasdchkhasdkjasdhkjas'}, {done: false, important: false, text: 'ascasdchkhasdkjasdhkjas'}, {done: false, important: false, text: 'ascasdchkhasdkjasdhkjas'}, {done: false, important: false, text: 'ascasdchkhasdkjasdhkjas'}, {done: false, important: false, text: 'ascasdchkhasdkjasdhkjas'}, {done: false, important: false, text: 'heellooodasodas'}]
        const fetched = await request('/api/todos/createCard', 'POST', { title, description, tasks }, {
            Authorization: `Bearer ${token}`,
            User: `Id ${userId}`
        })
        fetchedCards()
    }

    const createTodoHandler = async () => {
        const _id = '6022569df952eb2be841f7f2'
        const important = false
        const done = false
        const text = 'текст карточки'
        const fetched = await request('/api/todos/create', 'POST', { _id, important, done, text }, {
            Authorization: `Bearer ${token}`,
            User: `Id ${userId}`
        })
    }

    const fetchedCards = useCallback(async () => {
        try
        {
            const fetched  = await request('/api/todos/allCards', 'GET', null, {
                Authorization: `Bearer ${token}`,
                User: `Id ${userId}`
            })
            setCards(fetched)
        }
        catch (e) {}
    }, [token, userId, request])

    useEffect(() => {
        fetchedCards()
    }, [fetchedCards])
    
    // useEffect(() => {
    //     setCountToDo(getLenghtToDo())
    // }, [getLenghtToDo, setCountToDo])

    // useEffect(() => {
    //     setCountDone(getLenghtDone())
    // }, [setCountDone, getLenghtDone])

    if (loading || localLoading) return <Preloader />


    return(
        <div>
            <div>
            <button className="btn btn-primary" onClick={createCardHandler}>Добавить карточку </button>
            </div>
        <div className="container d-flex align-self-start justify-content-between flex-wrap">
            {
            cards.map(card => {
                return(
                    <div key={card._id} className="w-30">
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
                        {/* <button className="btn btn-primary" onClick={createTodoHandler}>Добавить тудушку </button> */}
                        <div className="card" style={{width: 18 + 'rem', marginTop: 50 + 'px', color: 'black'}}>
                            <div className="card-body">
                                <h5 className="card-title">{card.title}</h5>
                                <p className="card-text">{card.description}</p>
                            </div>
                            <ToDoList
                                todos={card.tasks}
                                // onDeleted={deleteHandler}
                                // onToggleDone= {changeDone}
                                // onToggleImportant= {changeImportant}
                            />
                            <div className="w-100">
                                <AddPanel 
                                    id={card._id}
                                />
                            </div>
                        </div>
                    </div>
                )
            })
            }
        </div>
        </div>
    )
    
}