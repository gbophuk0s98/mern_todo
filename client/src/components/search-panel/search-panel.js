import React, { useState } from 'react'

import './search-panel.css'

export const SearchPanel = ({ onSearchChange }) => {

    const [term, setTerm] = useState('')

    return <input 
            className="search-input" 
            placeholder="Поиск..."
            name="search"
            onChange={(e) => {
                onSearchChange(e.target.value)
            }}
        />
}