import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IBasketUser {
  basket: IBasketData[];
  addToBasket: (id: string, qty: number) => void
  removeFromBasket: (id: string) => void
  minusCountProduct: (id: string) => void
  clearBasket: () => void
  getQty : (id : string) => number
}

interface IBasketData {
  id: string
  qty : number
}

const useUserBasket = create<IBasketUser>()(
  persist((set, get) => ({
  basket : [],
  addToBasket : (id: string, qty: number) => {
    const hasToBasket = get().basket.find(item => item.id == id)
    if (hasToBasket) {
      set({basket : get().basket.map(item => item.id === id ? {...item, qty: item.qty + qty} : item)})
    }else{
      set({basket: [...get().basket, {id, qty}]})
    }
  },
  removeFromBasket : (id: string) => {
    set({basket: get().basket.filter((item: IBasketData) => item.id != id)})

  },
  minusCountProduct: (id: string) => {
    const countProduct = get().basket.find(item => item.id === id)
    if(!countProduct) return;
    if(countProduct.qty <= 1){
      set({basket : get().basket.filter(item => item.id !== id)})
    }else {
      set({basket: get().basket.map(item => item.id === id ? {...item, qty: item.qty - 1} : item)})
    }
  },
  clearBasket: () => set({basket : []}),
  getQty: (id) => {
    const product = get().basket.filter(item => item.id == id)
    const count = product[0].qty
    return count
  }
}),
{
  name: 'user-basket-storage',
  partialize: (state) => ({ basket: state.basket })
}
))

export default useUserBasket
