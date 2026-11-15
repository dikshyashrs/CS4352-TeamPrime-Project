"use client"
/**
 * TUTORIAL (route: /KioskTutorial)
 *
 * WELCOME SCREEN
 * The first screen customers see on the kiosk. Explains the three steps
 * (Menu -> Customize -> Checkout) and has a "Browse Menu" button that opens /menu.
 */
import Image from "next/image";
import { ForkKnifeIcon, ArrowRightIcon, ShoppingCart, SlidersHorizontal} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Home() {
  const router = useRouter();

  const navigateToMenu = () =>{
    router.push("/TutorialMenu")
  }
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans dark:bg-black/60">
      <main className=" rounded-lg flex flex-1 w-full my-8 max-w-3xl flex-col items-center justify-between py-32 pb-16 px-16 bg-white dark:bg-black sm:items-start gap-4 text-center">
       <h1 className="text-4xl font-bold text-center justify-center w-full">Ready to order?</h1>
       <p className="text-xl text-center text-muted-foreground">
        Explore the menu, customize your order and review everything before you checkout.
       </p>
       <div className="flex items-center gap-2 w-full my-4 rounded-lg bg-background p-6">
          <div className="flex flex-col items-center gap-2 w-1/3"><ForkKnifeIcon className="w-12 h-12" />
          <span className="text-xl font-semibold">Menu</span></div>
          <div className="flex flex-col items-center gap-2 w-1/3"><SlidersHorizontal className="w-12 h-12" />
          <span className="text-xl font-semibold">Customize</span></div>
          <div className="flex flex-col items-center gap-2 w-1/3"><ShoppingCart className="w-12 h-12" />
          <span className="text-xl font-semibold">Checkout</span></div>
        </div>
          <Button onPress={navigateToMenu} className="h-16 w-full gap-2 text-xl font-bold cursor-pointer">
         Browse Menu <ArrowRightIcon className="size-6" />
        </Button>

      </main>
    </div>
  );
}
