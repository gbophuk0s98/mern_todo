import { useState, useCallback, useEffect } from 'react'

const storageName = 'userData'

export const useAuth = () => {

    const [token, setToken] = useState()
    const [userId, setUserId] = useState()

    const login = useCallback((jwtToken, id) => {
        
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(storageName, JSON.stringify({
            token: token, userId: userId
        }))
    }, [])

    const logout = useCallback((jwtToken, id) => {
        
        setToken(null)
        setUserId(null)

        localStorage.removeItem(storageName)
    }, [])

    useEffect(() => {

        const data = JSON.parse(localStorage.getItem(storageName))

        if (data && data.token) login(data.token, data.userId)
    }, [login])

    return { login, logout, token, userId }
}