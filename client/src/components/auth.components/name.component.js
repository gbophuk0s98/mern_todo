import React from 'react'

export const NameComponent = ({ changeForm }) => {
    return(
        <div>
            <label htmlFor="inputName" className="visually-hidden">Name</label>
            <input
                name="name"
                type="text" 
                id="inputName" 
                className="form-control" 
                placeholder="Введите имя"
                onChange={changeForm}
            />
        </div>
    )
}