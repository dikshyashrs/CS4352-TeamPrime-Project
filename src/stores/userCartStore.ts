import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";
export const useUserCartStore = create<{cart: any[], addToCart: (product: any) => void, removeFromCart: (product: any) => void, clearCart: () => void}>()(
    
    
    persist(
    (set) => (
    {
    cart: [],
    addToCart: (product: any) => set((state: any) => ({ 
        cart: [...state.cart, product]

     })),
    removeFromCart: (product: any) => set((state: any) => ({ 
        cart: state.cart.filter((item: any) => item.id !== product.id)
     })),
    clearCart: () => set({ cart: [] }),
}),
    {
        name: "user-cart",
        storage: createJSONStorage(() => localStorage),
    }
))



;
export const getCart = () => {
    return useUserCartStore.getState().cart;
}