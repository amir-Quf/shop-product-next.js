import { IUserData } from '@/app/register/components/FormRegister'
import {create} from 'zustand'
import { persist } from 'zustand/middleware'

interface IUserState {
    user : IUserData
    setUser : (userDetails : IUserData) => void
    singOutUser : () => void
}

const useUserData = create<IUserState>()(persist((set, get) => ({
    user: {
        id: '',
        username: '',
        password: '',
        email: '',
        phone: '',
        address: '',
        role: '',
        orders: []
    },
    setUser : (userDetails : IUserData) => {
        set({user : userDetails})
    },
    singOutUser : () => {
        set({user : {id: '',
        username: '',
        password: '',
        email: '',
        phone: '',
        address: '',
        role: '',
        orders: []}})
    }
}),
{
    name : 'user-data'
}
))

export default useUserData