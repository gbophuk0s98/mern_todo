import React from 'react'
import { styles } from './styles'

export const PasswordComponent = ({ changeForm }) => {
        
    return(
        <div className="d-flex align-items-center mb-2">
            <label style ={styles.TextStyles} htmlFor="inputPassword">Пароль</label>
            <input
                style={styles.InputStyles}
                name="password"
                type="password"
                id="inputPassword"
                className="form-control"
                placeholder="Введите пароль"
                onChange={changeForm}/>
        </div>
    )
}