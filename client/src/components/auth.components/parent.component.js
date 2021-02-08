import React, { useState, useEffect } from 'react'
import { styles }  from './styles'
import {ChildComponent} from './child.component'
import { EmailComponent } from './email.component'
import { PasswordComponent } from './password.component'
import { NameComponent } from './name.component'

export const ParentComponent = ({ changeForm, mode }) => {

    const [email, setEmail] = useState({
        text: 'Почта', name: "email", type: "email", id: "inputEmail", placeholder: 'Введите почту'
    })
    const [password, setPassword] = useState({
        text: 'Пароль', name: "password", type: "password", id: "inputPassword", placeholder: 'Введите пароль'
    })
    const [name, setName] = useState({
        text: 'Имя', name: "name", type: "text", id: "inputName", placeholder: 'Введите имя'
    })
    const [isLogin, setIsLogin] = useState(false)

    useEffect(() => {
        setIsLogin(mode==='login')
    }, [mode])

    return(
        <div>
            {
                isLogin && 
                <div>
                    <ChildComponent 
                    changeForm={changeForm}
                    props={email} 
                    />
                    <ChildComponent 
                        changeForm={changeForm}
                        props={password} 
                    />
                </div>
            }

            {
                !isLogin && 
                <div>
                    <ChildComponent 
                        changeForm={changeForm}
                        props={name} 
                    />
                    <ChildComponent 
                    changeForm={changeForm}
                    props={email} 
                    />
                    <ChildComponent 
                        changeForm={changeForm}
                        props={password} 
                    />
                </div>
            }
        </div>
    )
}