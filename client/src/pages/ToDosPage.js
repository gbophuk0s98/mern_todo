import React, { useState, useEffect,  } from 'react'
import { AppHeader } from '../components/app-header/app-header'

export const ToDosPage = () => {

    const [todo, setTodo] = useState({
        text: '', 
        important: false, 
        done: false
    })
    const [term, setTerm] = useState('')
    const [filter, setFilter] = useState('all')
    const [countToDo, setCountToDo] = useState(5)
    const [countDone, setCountDone] = useState(0)

    return(
        <div className="container m-auto">
        <div className="mw-500">
            <AppHeader 
                toDo={countToDo} 
                done={countDone}
            />
            <div className="top-panel d-flex">
                {/* <SearchPanel 
                    onSearchChange={this.onSearchChange}
                />
                <ItemStatusFilter 
                    filter={filter}
                    onFilterChange={this.onFilterChange}
                /> */}
            </div>
            {/* <ToDoList 
                todos={visibleItems}
                onDeleted={this.deleteItem}
                onToggleDone= {this.onToggleDone}
                onToggleImportant= {this.onToggleImportant}
            />
            <AddPanel
                count={todoData.length}
                onAdded={this.addItem}
            /> */}
        </div>
    </div>
    )
}