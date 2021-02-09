import { useState, useCallback, useEffect } from 'react'
import { useHttp } from './http.hook'

const storageName = 'userData'

export const useAuth = () => {

    const [token, setToken] = useState()
    const [userId, setUserId] = useState()
    const { request } = useHttp()

    const login = useCallback((jwtToken, id) => {
        
        setUserId(id)
        setToken(jwtToken)

        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken, userId: id
        }))
    }, [])

    const logout = useCallback((jwtToken, id) => {
        
        request('/api/auth/deleteToken', 'DELETE', { id }, {})

        setToken(null)
        setUserId(null)

        localStorage.removeItem(storageName)
    }, [])

    useEffect(async () => {

        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token){
            const isExist = await request('/api/auth/getToken', 'POST', { token: data.token, userId: data.userId }, {})
            if (isExist.presence){
                login(data.token, data.userId)
            }
        } 
    }, [login])

    return { login, logout, token, userId }
}