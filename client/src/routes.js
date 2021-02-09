import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { ToDosPage } from './pages/ToDosPage'
import { Navbar } from './components/navbar/navbar.component'

export const useRoutes = isAuthenticated => {

    if (isAuthenticated){
        return(
            <Switch>
                <Route path="/todos" exact>
                    <Navbar/>
                    <ToDosPage/>
                </Route>
                <Redirect from="/" to="/todos"/>
            </Switch>
        )
    }

    return(
        <Switch>
            <Route path="/login" exact>
                <LoginPage />
            </Route>
            <Route path="/register" exact>
                <RegisterPage />
            </Route>
            <Redirect from="/" to="/login"/>
        </Switch>
    )
}