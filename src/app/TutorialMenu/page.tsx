"use client";
/**
 * MENU (route: /menu)
 *
 * Shows every menu item, grouped into category tabs (Mains, Sides, Drinks, Desserts).
 * Each item card can be:
 *   - tapped to open its product page (/menu/[productId]) with the full description
 *   - added straight to the order with the gold "+" button
 *   - customized with the "Customize" button (only items that have options, see src/data/menu.ts)
 * The green "Your order" box shows the item count and running total, followed by
 * buttons to review the order (/order) or clear it.
 * Menu data lives in src/data/menu.ts; the order (cart) lives in src/stores/userCartStore.ts.
 */

import { ArrowRightIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation";
import { categories, foodItems } from "@/data/menu";
import { useUserCartStore } from "@/stores/userCartStore";
import { toast } from "sonner";
import { CustomizeDialog } from "@/components/CustomizeDialog";
import {
    DialogTrigger,
    ModalOverlay,
    Modal,
    Dialog,
    Heading,
} from "react-aria-components";
import EntryModal from '@/components/TutorialModalOverlayMenu';
import { useState } from "react";
const formatPrice = (n: number) => `$${n.toFixed(2)}`;

export default function Home() {
  // Subscribe to the store so the order summary updates when items are added/cleared
  const cart = useUserCartStore((s) => s.cart);
  const { clearCart, addToCart } = useUserCartStore();
  const cardItems = cart.map((item) => item.name);
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const navigate = (path: any) => {
    router.push(path);
  }




  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans dark:bg-black">
      <main className=" rounded-lg flex flex-1 w-full my-8 max-w-3xl flex-col items-center justify-between pt-8 pb-16 px-16 bg-white dark:bg-black sm:items-start gap-4 text-center">
       <div>
        <h1 className="text-4xl font-bold text-left justify-left w-full">Menu</h1>
        
        </div>
        {/* CATEGORIES  */}
        <Tabs defaultSelectedKey="Mains" className="w-full">
      <TabsList aria-label="Menu categories" className="w-full gap-2 p-1.5 group-data-horizontal/tabs:h-auto">
       {categories.map((category) => (
        <TabsTrigger
          key={category.name}
          id={category.name}
          className="h-14 flex-1 basis-0 gap-2 rounded-full px-5 text-lg font-semibold leading-none text-foreground cursor-pointer data-selected:bg-primary data-selected:text-primary-foreground"
        >
          <category.icon className="size-6" />
          {category.name}
        </TabsTrigger>
       ))}
      </TabsList>
       {/* FOOD ITEMS */}

      {categories.map((category)=> (
      <TabsContent key={category.name} id={category.name}>
         <div className="grid grid-cols-2 gap-6 mt-6 text-left">
          {foodItems[category.name].map((item)=> (
            <div key={item.name} className="relative flex flex-col rounded-2xl border-2 border-border bg-card transition-shadow hover:shadow-lg">
              {/* Whole card is one large tap target that opens the product page */}
              <button
                type="button"
                onClick={()=>{navigate(`/menu/${encodeURIComponent(item.name)}`)}}
                className={`flex flex-1 flex-col gap-3 rounded-2xl p-4 text-left cursor-pointer ${item.options ? "pb-40" : "pb-24"}`}
              >
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image} alt={item.name} className="w-full h-48 rounded-xl object-cover" />
                ) : (
                  <Skeleton className="w-full h-48 bg-zinc-300 dark:bg-zinc-800" />
                )}
                <h3 className="text-2xl font-bold text-foreground animate-in fade-in slide-in-from-bottom-2 duration-200">{item.name}</h3>
                <p className="text-xl font-normal text-muted-foreground line-clamp-2">{item.description}</p>
              </button>
              {/* Customize sits above the price row, outside the card button (buttons can't be nested) */}
              {item.options && (
                <CustomizeDialog item={item} className="absolute inset-x-4 bottom-24" />
              )}
              <div className="pointer-events-none absolute inset-x-4 bottom-4 flex items-center justify-between">
                <p className="text-2xl font-bold text-foreground">{formatPrice(item.price)}</p>
                <Button
                  aria-label={`Add ${item.name} to order`}
                  onPress={()=>{addToCart(item); toast.success(`${item.name} added`)}}
                  className="pointer-events-auto size-16 rounded-full bg-gold text-gold-foreground shadow-md hover:bg-gold-hover cursor-pointer"
                >
                  <Plus className="size-8" strokeWidth={3} />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </TabsContent>
      ))}
    </Tabs>

          {/* ORDER SUMMARY */}
          <div className="w-full rounded-2xl bg-primary p-5 text-left text-primary-foreground">
            <p className="text-lg font-bold uppercase tracking-wider text-white">Your order</p>
            <p className="text-2xl font-bold">
              {cart.length} {cart.length === 1 ? "item" : "items"} · {formatPrice(cart.reduce((acc, item) => acc + item.price, 0))}
            </p>
            {cardItems.length > 0 && (
              <p className="mt-1 truncate text-xl text-white">{cardItems.join(", ")}</p>
            )}
          </div>

          <div className="flex w-full gap-3">
            <Button onPress={() => navigate("/order")} className="h-16 flex-3 gap-2 text-xl font-bold cursor-pointer">
              Review Order and Checkout <ArrowRightIcon className="size-6" />
            </Button>
            <Button
              variant="outline"
              onPress={()=>{clearCart();toast.success("Order cleared")}}
              className="h-16 flex-1 border-2 border-primary bg-white text-xl font-semibold text-primary hover:bg-primary/10 cursor-pointer"
            >
              Clear Order
            </Button>
          </div>
          {isOpen && (
              <div
                  // Clicking the backdrop triggers the close function
                  onClick={()=>{navigate(`/CustomizationTutorial/${encodeURIComponent("Classic Cheeseburger")}`)}}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
              >
                  <div
                      // 3. Stop click events inside the modal box from bubbling up to the backdrop
                      onClick={(e) => e.stopPropagation()}
                      className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-xl dark:bg-zinc-900"
                  >
                      <Heading slot="title" className="text-3xl font-bold">
                          Step 2: Navigating the Menu
                      </Heading>
                      <p className="text-xl">
                          You can choose from Mains, Sides, Drinks or Desserts using the buttons at the top of the page, and you can add any items to your cart by clicking on the image.
                          To start we will by ordering a Classic Cheeseburger.
                      </p>
                  </div>
              </div>
          )}
      </main>

    </div>
  );
}
