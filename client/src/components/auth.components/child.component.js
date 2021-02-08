import React from 'react'
import { styles }  from './styles'

export const ChildComponent = ({ changeForm, props }) => {

    return(
        <div className="d-flex align-items-center mb-2">
            <label style={styles.TextStyles} htmlFor={props.id}>{props.text}</label>
            <input 
                style={styles.InputStyles}
                name={props.name}
                type={props.type}
                id={props.id}
                className="form-control"
                placeholder={props.placeholder}
                onChange={changeForm}
                />
        </div>
    )
}