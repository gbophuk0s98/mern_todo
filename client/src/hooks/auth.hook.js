import { useState, useCallback, useEffect } from 'react'
import { useHttp } from './http.hook'

const storageName = 'userData'

export const useAuth = () => {

    const [token, setToken] = useState()
    const [userId, setUserId] = useState()
    const { request } = useHttp()

    const login = useCallback(async (jwtToken, id) => {
        
        setUserId(id)
        setToken(jwtToken)

        localStorage.setItem(storageName, JSON.stringify({
            token: jwtToken, userId: id
        }))
    }, [])

    const logout = useCallback((jwtToken, id) => {
        
        setToken(null)
        setUserId(null)
        
        request('/api/auth/deleteToken', 'DELETE', { jwtToken, id }, {
            Authorization: `Bearer ${jwtToken}`,
            User: `Id ${id}`
        })

        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {

        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) login(data.token, data.userId)
    }, [login])

    return { login, logout, token, userId }
}