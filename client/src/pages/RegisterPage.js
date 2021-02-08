import React, { useState, useContext} from 'react'
import { EmailComponent } from '../components/email/email.component'
import { NameComponent } from '../components/name/name.component'
import { PasswordComponent } from '../components/password/password.component'
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
        <div className="form-container text-center">
            <div className="form-signin">
                <form>
                    <img className="mb-4 picture" src="/static/media/bootstrap-logo.b91717f3.svg" alt="" width="72" height="57"/>
                    <h1 className="h3 mb-3 fw-normal">Регистрация</h1>

                    <NameComponent changeForm={changeForm}/>
                    <EmailComponent changeForm={changeForm}/>
                    <PasswordComponent changeForm={changeForm}/>

                    <div className="checkbox mb-3">
                        <label>
                            <input type="checkbox" value="remember-me"/> Запомнить меня
                        </label>
                    </div>

                    <button className="w-100 btn btn-lg btn-primary" type="button" onClick={registerHandler}>Зарегистрироваться</button>
                    <p className="mt-3 mb-3 text-muted">©gbophuk0s 2021</p>

                </form>
            </div>
      </div>
    )
}