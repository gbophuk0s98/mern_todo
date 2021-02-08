import React, { useState, useEffect } from 'react'

import './app-header.css'

export const AppHeader = ({toDo, done}) => {

    const [textDone, setTextDone] = useState('')
    const [textToDo, setTextToDo] = useState('')

    const genereteStringDone = () => {
        if (done === 1) setTextDone('дело')
        else if (done > 1 && done < 5) setTextDone('дела')
        else setTextDone('дел')
    }

    const generaTeStringToDo = () => {
        if (toDo === 1) setTextToDo('дело')
        else if (toDo > 1 && toDo < 5) setTextToDo('дела')
        else setTextToDo('дел')
    }

    useEffect(() => {
        genereteStringDone()
    }, [genereteStringDone, done])

    useEffect(() => {
        generaTeStringToDo()
    }, [generaTeStringToDo, toDo])

    return (
        <div className="app-header d-flex">
            <h1>Список дел</h1>
            <h2>{toDo} {textToDo} нужно выполнить, {done} {textDone} выполнено</h2>
        </div>
        )
}