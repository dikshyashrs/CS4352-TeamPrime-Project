"use client";

import Image from "next/image";
import { ForkKnifeIcon, ArrowRightIcon, ShoppingCart, SlidersHorizontal,Hamburger,Salad,GlassWater,Cake} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { useRouter } from "next/navigation";
import { categories, foodItems } from "@/data/menu";
import { getCart, useUserCartStore } from "@/stores/userCartStore";
import { toast } from "sonner";

export default function Home() {
  const cart = getCart();
  const { clearCart } = useUserCartStore();
  const cardItems = cart.map((item) => item.name);
  const router = useRouter();
  const navigate = (path: any) => {
    router.push(path);
  }




  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-300 font-sans dark:bg-black">
      <main className=" rounded-lg flex flex-1 w-full my-8 max-w-3xl flex-col items-center justify-between pt-8 pb-16 px-16 bg-white dark:bg-black sm:items-start gap-4 text-center">
       <div>
        <h1 className="text-4xl font-bold text-left justify-left w-full">Menu</h1>
        
        </div>
        {/* CATEGORIES  */}
        <Tabs defaultSelectedKey="Mains" className="w-full">
      <TabsList>
       {categories.map((category) => (
        <TabsTrigger key={category.name} id={category.name}>
          <category.icon className="w-4 h-4" />
          {category.name}
        </TabsTrigger>
       ))}
      </TabsList> 
       {/* FOOD ITEMS */}
       
      {categories.map((category)=> (
      <TabsContent key={category.name} id={category.name}>
         <div className="grid grid-cols-3 gap-4 mt-6 cursor-pointer" >
          {foodItems[category.name].map((item)=> (
            <div onClick={()=>{navigate(`/menu/${item.name}`)}}><Skeleton className="w-full h-48 w-full bg-zinc-300 dark:bg-zinc-800" />
             <div className="flex flex-col gap-1">
              <h3 className="text-lg font-bold animate-in fade-in slide-in-from-bottom-2 duration-200">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.price}</p>
             </div>
              </div>
             
          ))}
        </div> 
      </TabsContent>
      ))}
    </Tabs>
  
   
          <div className="flex w-full flex-col-2 gap-2">        
        <Button  className=" flex-3 hover:bg-rose-500 hover:shadow-lg hover:font-bold bg-rose-500 text-white px-4 py-2 rounded-md flex items-center gap-2 w-full text-center justify-center cursor-pointer hover:bg-rose-600 transition-all duration-300">
         Review Order <ArrowRightIcon className="w-4 h-4 text-white" />

          </Button> 
          <Button  onClick={()=>{clearCart();toast.success("Order cleared")}} className=" flex-1 hover:bg-rose-500 hover:shadow-lg hover:font-bold bg-rose-500 text-white px-4 py-2 rounded-md flex items-center gap-2 w-full text-center justify-center cursor-pointer hover:bg-rose-600 transition-all duration-300">
            Clear Order
          </Button>
          </div>
          <Button isDisabled  className="hover:bg-rose-500 hover:shadow-lg hover:font-bold bg-rose-500 text-white px-4 py-2 rounded-md flex items-center gap-2 w-full text-center justify-center cursor-pointer hover:bg-rose-600 transition-all duration-300">
         Your order: {cart.length} items for {cart.reduce((acc, item) => acc + item.price, 0)}

          </Button> 
          <Button isDisabled  className="text-clip overflow-hidden text-ellipsis whitespace-nowrap max-w-full truncate hover:bg-rose-500 hover:shadow-lg hover:font-bold bg-rose-500 text-white px-4 py-2 rounded-md flex items-center gap-2 w-full text-center justify-center cursor-pointer hover:bg-rose-600 transition-all duration-300">
         {cardItems.join(", ")}

          </Button> 
      </main>
    </div>
  );
}
