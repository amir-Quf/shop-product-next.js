import {create} from 'zustand'
import { persist } from 'zustand/middleware'
import { IBasketData } from '../userBasket/userBasket';

interface IUserOrder {
  status: 'being reviewed' | 'sending' | 'rejected' | 'delivered';
  basket: IBasketData[];
  id: string;
}

interface IUserDataState {
  id: string,
  password: string,
  email: string,
  address: string,
  username: string,
  phone: string,
  role: "user" | "admin",
  orders: IOrdersState[],
}

interface IOrdersState {
  id: string;
  basket: IBasketData[];
  status: "being reviewed" | "sending" | "rejected" | "delivered";
}

interface IUserState {
    user : IUserDataState
    setUser : (userDetails : IUserDataState) => void
    singOutUser : () => void
    updateOrdersUser : ({status,basket,id} : IUserOrder) => void
}

const useUserData = create<IUserState>()(persist((set, get) => ({
    user: {
        id: '',
        username: '',
        password: '',
        email: '',
        phone: '',
        address: '',
        role: 'user',
        orders: []
    },
    setUser : (userDetails : IUserDataState) => {
        set({user : userDetails})
    },
    singOutUser : () => {
        set({user : {id: '',
        username: '',
        password: '',
        email: '',
        phone: '',
        address: '',
        role: 'user',
        orders: []}})
    },
    updateOrdersUser : ({status,basket,id} : IUserOrder) => {
        set({user : {...get().user, orders : [...get().user.orders, {status, basket, id}]}})
    }
}),
{
    name : 'user-data'
}
))

export default useUserData