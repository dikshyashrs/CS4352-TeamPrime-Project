import { create } from "zustand";
import { persist } from "zustand/middleware";
import { createJSONStorage } from "zustand/middleware";
export const useUserCartStore = create<{cart: any[], addToCart: (product: any) => void, removeFromCart: (product: any) => void, removeOne: (name: string) => void, clearCart: () => void}>()(
    
    
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
    // Removes a single unit of an item (matched by name), e.g. 3 burgers -> 2
    removeOne: (name: string) => set((state: any) => {
        const index = state.cart.findIndex((item: any) => item.name === name);
        if (index === -1) return state;
        return { cart: [...state.cart.slice(0, index), ...state.cart.slice(index + 1)] };
     }),
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