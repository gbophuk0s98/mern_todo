import React, { Component } from 'react'

export class EmailComponent extends Component {

    render(){
        
        const { changeForm } = this.props

        return(
            <div>
                <label htmlFor="inputEmail" className="visually-hidden">Email address</label>
                <input 
                    name="email"
                    type="email"
                    id="inputEmail"
                    className="form-control"
                    placeholder="pavel.surta@mail.ru"
                    onChange={changeForm}
                    />
            </div>
        )
    }
}