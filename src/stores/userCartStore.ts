/**
 * ORDER (CART) STORE
 * Holds the customer's current order and is shared by every page (built with Zustand).
 * `cart` is a flat list with one entry per item added: two burgers = two entries.
 * The review page (/order) groups them into rows with quantities.
 * Customized items also carry their chosen options and a `key` (name + choices), so a
 * plain burger and a "no pickles" burger are treated as different items.
 * The order is saved in the browser's localStorage, so it survives a page refresh.
 *   - addToCart(item)   add one item
 *   - removeOne(key)    remove one copy of an item (used by the "-" button on /order)
 *   - clearCart()       empty the order ("Clear Order", or after checkout)
 *   - removeFromCart() and getCart() are older helpers that nothing currently uses.
 */
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