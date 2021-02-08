import React, { Component } from 'react'

export class PasswordComponent extends Component {
    render(){

        const { changeForm } = this.props
        
        return(
            <div>
                <label htmlFor="inputPassword" className="visually-hidden">Password</label>
                <input 
                    name="password"
                    type="password"
                    id="inputPassword"
                    className="form-control"
                    placeholder="Введите пароль"
                    onChange={changeForm}/>
            </div>
        )
    }
}