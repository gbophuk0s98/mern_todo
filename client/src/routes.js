import React from 'react'
import { Switch, Redirect, Route } from 'react-router-dom'
import { LoginPage } from './pages/LoginPage'
import { RegisterPage } from './pages/RegisterPage'
import { ToDosPage } from './pages/ToDosPage'

export const useRoutes = isAuthenticated => {
    if (isAuthenticated){
        return(
            <Switch>
                <Route path="/todos" >
                    <ToDosPage/>
                </Route>
                <Redirect from="/" to="/todos"/>
            </Switch>
        )
    }

    return(
        <Switch>
            <Route path="/login">
                <LoginPage />
            </Route>
            <Route path="/register" exact>
                <RegisterPage />
            </Route>
            <Redirect from="/" to="/login"/>
        </Switch>
    )
}