import React, { Component } from 'react'

export class NameComponent extends Component {

    render(){

        const { changeForm } = this.props

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
}