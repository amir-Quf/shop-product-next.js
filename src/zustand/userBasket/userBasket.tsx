import { IProductData } from '@/app/store/page';
import axios from 'axios';
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface IBasketUser {
  basket: IBasketData[];
  addToBasket: (id: string, qty: number) => void
  removeFromBasket: (id: string) => void
  minusCountProduct: (id: string) => void
  clearBasket: () => void
  getQty : (id : string) => number
  finalPrice : () => Promise<number>
  totalDiscount : () => Promise<number>
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
  },
  finalPrice: async () => {
  const res = await axios.get('http://localhost:4000/products');
  const allProducts: IProductData[] = res.data;

  const basketItemsWithDetails = get().basket.map(basketItem => {
    const product = allProducts.find(p => p.id === basketItem.id);
    return product ? { ...product, qty: basketItem.qty } : null;
  }).filter(item => item !== null) as (IProductData & { qty: number })[];

  const totalPrice = basketItemsWithDetails.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);

  return totalPrice;
},
totalDiscount: async () => {
  const res = await axios.get('http://localhost:4000/products');
  const allProducts: IProductData[] = res.data;

  const basket = get().basket;

  const total = basket.reduce((sum, basketItem) => {
    const product = allProducts.find(p => p.id === basketItem.id);
    if (!product || !product.discount) return sum;

    const discountPerUnit = (product.price * product.discount) / 100;
    const totalDiscountForItem = discountPerUnit * basketItem.qty;

    return sum + totalDiscountForItem;
  }, 0);

  return total;
}

}),
{
  name: 'user-basket-storage',
  partialize: (state) => ({ basket: state.basket })
}
))

export default useUserBasket
