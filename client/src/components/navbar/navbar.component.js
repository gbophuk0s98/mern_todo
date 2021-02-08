import React, { useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../context/auth.context'
import { styles } from '../auth.components/styles'

export const Navbar = () => {

    const auth = useContext(AuthContext)

    const logoutHandler = event => {
        event.preventDefault()
        auth.logout(auth.token, auth.userId)
    }

    return(
        <nav className="navbar navbar-expand-lg navbar-dark" style={styles.NavBarStyles} aria-label="Ninth navbar example">
            <div className="container-xl">
                <a className="navbar-brand" href="#">Планировщик задач</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExample07XL" aria-controls="navbarsExample07XL" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarsExample07XL">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/todos">Ваши дела</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Куда-нибудь еще</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">И еще куда-нибудь</NavLink>
                        </li>
                    </ul>
                    <form>
                        <button className="btn btn-primary" onClick={logoutHandler}>Выйти</button>
                    </form>
                </div>

            </div>
        </nav>
    )
}