"use client";
import Image from "next/image";
import { ForkKnifeIcon, ArrowRightIcon, ShoppingCart, SlidersHorizontal,Hamburger,Salad,GlassWater,Cake} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton"
import { useParams, useRouter } from "next/navigation";
import { foodItems } from "@/data/menu";
import { useUserCartStore } from "@/stores/userCartStore";
import { toast } from "sonner";
import { useEffect } from "react";
export default  function Page() {
  const { productId} = useParams();
  const productName = decodeURIComponent(productId as any);
  const router = useRouter();
  const flatFoodItems = Object.values(foodItems).flatMap((item)=> item);
  const productData:any = flatFoodItems.find((item)=> item.name === productName);
  const { addToCart } = useUserCartStore();
  function navigate(path: any) {
    router.push(path);
  }


  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans dark:bg-black">
      <main className=" rounded-lg flex flex-1 w-full my-8 max-w-4xl flex-col items-center justify-between pt-8 pb-16 px-16 bg-white dark:bg-black sm:items-start gap-4 text-center">
      <h1 className="text-4xl font-bold text-left justify-left w-full">{productName}</h1>

      <div className="grid grid-cols-2 gap-4 w-full">


        
        {/* IMAGE */}
            <div>
        <Skeleton className="w-full h-96 bg-zinc-400 dark:bg-zinc-800" />
              
          </div>




          {/* DESCRIPTION */}

          <div className="w-full h-full flex flex-col items-start justify-center gap-4 text-left">
        {productData ? (
          <>
            <p className="text-3xl font-bold">${productData.price.toFixed(2)}</p>
            <p className="text-xl text-muted-foreground">{productData.description}</p>
          </>
        ) : <p className="text-xl">Product not found</p>}

            
        </div>







      </div>
      
       <div>
        
        </div>
        
  
   
                  
        <Button isDisabled={!productData} onPress={()=>{addToCart(productData); navigate(`/menu`); toast.success("Added to cart")}} className="h-16 w-full gap-2 text-xl font-bold cursor-pointer">
         Add to order <ArrowRightIcon className="size-6" />

          </Button> 
      </main>
    </div>
  );
}
