"use client"
import Image from "next/image";
import { ForkKnifeIcon, ArrowRightIcon, ShoppingCart, SlidersHorizontal} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  const navigateToMenu = () =>{
    router.push("/menu")
  }
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-300 font-sans dark:bg-black">
      <main className=" rounded-lg flex flex-1 w-full my-8 max-w-3xl flex-col items-center justify-between py-32 pb-16 px-16 bg-white dark:bg-black sm:items-start gap-4 text-center">
       <h1 className="text-4xl font-bold text-center justify-center w-full">Ready to order?</h1>
       <p className="text-lg text-center">
        Explore the menu, customize your oder and review everything before you checkout.
       </p>
       <div className="flex items-center gap-2 w-full my-4 rounded-lg bg-zinc-100 p-4">
          <div className="flex flex-col items-center gap-2 w-1/3"><ForkKnifeIcon className="w-10 h-10" />
          <span className="text-sm font-medium">Menu</span></div>
          <div className="flex flex-col items-center gap-2 w-1/3"><SlidersHorizontal className="w-10 h-10" />
          <span className="text-sm font-medium">Customize</span></div>
          <div className="flex flex-col items-center gap-2 w-1/3"><ShoppingCart className="w-10 h-10" />
          <span className="text-sm font-medium">Checkout</span></div>
        </div>
         <Button onClick={navigateToMenu} className="bg-rose-500 text-white px-4 py-2 rounded-md flex items-center gap-2 w-full text-center justify-center cursor-pointer hover:bg-rose-600 transition-all duration-300">
         Browse Menu <ArrowRightIcon className="w-4 h-4 text-white" />

          </Button>         
     
      </main>
    </div>
  );
}
