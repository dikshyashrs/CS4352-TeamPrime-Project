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
    // Removes a single unit of an item, e.g. 3 burgers -> 2.
    // Customized items are matched by `key` (name + choices), plain items by name.
    removeOne: (key: string) => set((state: any) => {
        // Remove the LAST copy so the item's first copy (and its row on the order page) stays in place
        const index = state.cart.findLastIndex((item: any) => (item.key ?? item.name) === key);
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