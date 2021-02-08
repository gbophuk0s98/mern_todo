import React from 'react'
import { styles }  from './styles'

export const EmailComponent = ({ changeForm }) => {

    return(
        <div className="d-flex d-flex align-items-center mb-2">
            <label style={styles.TextStyles} className="email-component" htmlFor="inputEmail" className="visually">Почта</label>
            <input 
                style={styles.InputStyles}
                name="email"
                type="email"
                id="inputEmail"
                className="form-control"
                placeholder="Введите почту"
                onChange={changeForm}
                />
        </div>
    )
}