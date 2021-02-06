import React, { useState } from 'react'
import './item-status-filter.css'

export const ItemStatusFilter = ({ filter, onFilterChange }) => {

    const [buttons, setButtons] = useState([
        { name: 'all', label: 'All', },
        { name: 'active', label: 'Active', },
        { name: 'done', label: 'Done', }
    ])

    const btns = buttons.map(({ name, label }) => {
        const isActive = filter === name
        const btnClass =  isActive ? "btn-info" : "btn-outline-secondary"
        return (
            <button type="button"
                className={`btn ${btnClass}`} 
                key={name}
                onClick={() => {onFilterChange(name)}}
            >
                {label}
            </button>
        )
    })

    return (
        <div className="btn-group">
            {btns}
        </div>
    )
    
}