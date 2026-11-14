"use client";

import { ArrowRightIcon, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation";
import { categories, foodItems } from "@/data/menu";
import { useUserCartStore } from "@/stores/userCartStore";
import { toast } from "sonner";

const formatPrice = (n: number) => `$${n.toFixed(2)}`;

export default function Home() {
  // Subscribe to the store so the order summary updates when items are added/cleared
  const cart = useUserCartStore((s) => s.cart);
  const { clearCart, addToCart } = useUserCartStore();
  const cardItems = cart.map((item) => item.name);
  const router = useRouter();
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
                className="flex flex-1 flex-col gap-3 rounded-2xl p-4 pb-24 text-left cursor-pointer"
              >
                <Skeleton className="w-full h-48 bg-zinc-300 dark:bg-zinc-800" />
                <h3 className="text-2xl font-bold text-foreground animate-in fade-in slide-in-from-bottom-2 duration-200">{item.name}</h3>
                <p className="text-xl font-normal text-muted-foreground line-clamp-2">{item.description}</p>
              </button>
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
      </main>
    </div>
  );
}
