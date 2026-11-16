"use client"
/**
 * FINISH TUTORIAL SCREEN (route: /FinishTutorial)
 *
 * Last screen of the tutorial, a copy of the welcome page with a tutorial popup telling the user where to find the tutorial
 * and letting them continue to the actual menu.
 */
import Image from "next/image";
import { ForkKnifeIcon, ArrowRightIcon, ShoppingCart, SlidersHorizontal} from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import {
    DialogTrigger,
    ModalOverlay,
    Modal,
    Dialog,
    Heading,
} from "react-aria-components";
export default function Home() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const navigateToMenu = () =>{
    router.push("/menu")
  }
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans dark:bg-black">
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
          {isOpen && (
              <div
                  // Clicking the backdrop triggers the close function
                  onClick={() => setIsOpen(false)}
                  className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
              >
                  <div
                      // 3. Stop click events inside the modal box from bubbling up to the backdrop
                      onClick={(e) => e.stopPropagation()}
                      className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-xl dark:bg-zinc-900"
                  >
                      <Heading slot="title" className="text-3xl font-bold">
                          Step 6: You're ready!
                      </Heading>
                      <p className="text-xl">
                          Congratulations you're ready to order! If you need to access this tutorial again just
                          tap on "Kiosk Tutorial" in the top right.
                      </p>
                  </div>
              </div>
          )}
      </main>
    </div>
  );
}
