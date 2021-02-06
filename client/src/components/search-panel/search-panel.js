import React, { useState } from 'react'

import './search-panel.css'

export const SearchPanel = ({ onSearchChange }) => {

    const [term, setTerm] = useState('')

    const onSearchChangePanel = event => {
        const term = event.target.value
        setTerm(term)
        onSearchChange(term)
    }

    return <input 
            className="search-input" 
            placeholder="Поиск..."
            value={term}
            onChange={onSearchChangePanel}
        />
}