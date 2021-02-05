import React, { useState, useContext } from 'react'
import { EmailComponent } from '../components/email.component'
import { PasswordComponent } from '../components/password.component'
import { Link } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/auth.context'

export const LoginPage = () => {

    const { loading, request, error, clearError } = useHttp()
    const auth = useContext(AuthContext)

    const [form, setForm] = useState({
        email: '',
        password: '',
    })

    const changeForm = (event) => {
        setForm({
            ...form, 
            [event.target.name]: event.target.value
        })
    }

    const loginHandler = async () => {
        try
        {
            const data = await request("/api/auth/login", 'POST', {...form})
            auth.login(data.userId, data.token)
        }
        catch {}
    }

    return(
        <div className="form-container text-center">
            <div className="form-signin">
                <form>
                    <h1 className="h3 mb-3 fw-normal">Войти</h1>

                    <EmailComponent changeForm={changeForm}/>
                    <PasswordComponent changeForm={changeForm}/>

                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me"/> Запомнить меня
                        </label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="button" onClick={loginHandler}>Войти</button>
                    <Link to="/register">
                        <button type="button" className="btn btn-link">Регистрация</button>
                    </Link>
                    <p className="mt-3 mb-3 text-muted">©gbophuk0s 2021</p>

                </form>
            </div>
      </div>
    )
}