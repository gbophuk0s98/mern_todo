import React, { useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import { ParentComponent } from '../components/auth.components/parent.component'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/auth.context'

export const RegisterPage = () => {

    const { loading, request, error, clearError } = useHttp()
    const auth = useContext(AuthContext)

    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    })

    const changeForm = (event) => {
        setForm({
            ...form, 
            [event.target.name]: event.target.value
        })
    }

    const registerHandler = async () => {
        try
        {
            const data = await request("/api/auth/register", 'POST', {...form})
            auth.login(data.token, data.userId)
        }
        catch {}
    }

    return(
        <div className="form-container text-center bg-dark">
            <div className="form-signin">
                <form>
                    <img className="mb-3 picture" src="favicon.png" alt="" width="80" height="80"/>
                    <h1 className="h3 mb-3 fw-normal">Регистрация</h1>

                    <ParentComponent
                        changeForm={changeForm}
                        mode="register"
                    />

                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me"/> Запомнить меня
                        </label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="button" onClick={registerHandler}>Зарегистрироваться</button>
                    <Link to="/login">
                            <button type="button" className="btn btn-link">Авторизоваться</button>
                    </Link>
                    <p className="mt-3 mb-3 text-muted">©gbophuk0s 2021</p>

                </form>
            </div>
      </div>
    )
}