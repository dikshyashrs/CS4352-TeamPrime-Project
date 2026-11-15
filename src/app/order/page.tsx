"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  DialogTrigger,
  ModalOverlay,
  Modal,
  Dialog,
  Heading,
} from "react-aria-components";
import {
  ArrowLeftIcon,
  CreditCard,
  Minus,
  Plus,
  UserRound,
  X,
  CreditCardReader,
  HandPlatter,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUserCartStore } from "@/stores/userCartStore";

const formatPrice = (n: number) => `$${n.toFixed(2)}`;

type PaymentOption = {
  id: string;
  label: string;
  icon: LucideIcon;
  confirmTitle: string;
  confirmText: string;
  confirmIcon: LucideIcon;
};

const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: "kiosk",
    label: "Pay with card in kiosk",
    icon: CreditCard,
    confirmTitle: "Tap or insert your card",
    confirmText: "Use the card reader below this screen to complete your payment.",
    confirmIcon: CreditCardReader,
  },
  {
    id: "employee",
    label: "Pay with an employee",
    icon: UserRound,
    confirmTitle: "A team member is on the way",
    confirmText: "Please stay here. Someone will be with you shortly to take your payment.",
    confirmIcon: HandPlatter,
  },
];

export default function OrderPage() {
  const router = useRouter();
  const cart = useUserCartStore((s) => s.cart);
  const { addToCart, removeOne, clearCart } = useUserCartStore();

  // The cart lives in localStorage, so wait until we're in the browser before showing it
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [payment, setPayment] = useState<PaymentOption | null>(null);

  // Group duplicate items into one row with a quantity.
  // Customized items carry a `key` (name + choices), so different customizations get their own rows.
  const lines = Object.values(
    cart.reduce<Record<string, { key: string; item: any; qty: number }>>((acc, item) => {
      const key = item.key ?? item.name;
      acc[key] ??= { key, item, qty: 0 };
      acc[key].qty += 1;
      return acc;
    }, {})
  );
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const isEmpty = mounted && cart.length === 0;

  function handleCheckoutOpenChange(isOpen: boolean) {
    setCheckoutOpen(isOpen);
    if (!isOpen) setPayment(null); // reopen on the choices next time
  }

  function finishOrder() {
    clearCart();
    setCheckoutOpen(false);
    router.push("/");
  }

  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-background font-sans">
      <main className="rounded-lg flex flex-1 w-full my-8 max-w-3xl flex-col gap-6 pt-8 pb-16 px-16 bg-white text-left">
        <Button
          variant="outline"
          onPress={() => router.push("/menu")}
          className="h-14 w-fit gap-2 border-2 border-primary bg-white px-5 text-xl font-semibold text-primary hover:bg-primary/10 cursor-pointer"
        >
          <ArrowLeftIcon className="size-6" />
          Back to menu
        </Button>

        <h1 className="text-4xl font-bold">Review your order</h1>

        {!mounted ? null : isEmpty ? (
          <div className="flex flex-col items-start gap-4 rounded-2xl bg-background p-8">
            <p className="text-2xl font-semibold">Your order is empty.</p>
            <p className="text-xl text-muted-foreground">Go back to the menu to add items.</p>
          </div>
        ) : (
          <>
            {/* ITEMS */}
            <ul className="flex flex-col divide-y-2 divide-border rounded-2xl border-2 border-border">
              {lines.map(({ key, item, qty }) => (
                <li key={key} className="flex items-center gap-4 p-5">
                  <div className="flex flex-1 flex-col gap-1">
                    <p className="text-2xl font-bold">{item.name}</p>
                    {item.selections?.map((s: { group: string; label: string; price: number }) => (
                      <p key={s.group} className="text-xl text-foreground">
                        {s.group}: {s.label}{s.price > 0 && ` (+${formatPrice(s.price)})`}
                      </p>
                    ))}
                    <p className="text-xl text-muted-foreground">{formatPrice(item.price)} each</p>
                  </div>

                  <div className="flex items-center gap-3">
                    <Button
                      aria-label={qty === 1 ? `Remove ${item.name}` : `Remove one ${item.name}`}
                      onPress={() => removeOne(key)}
                      className="size-14 rounded-full border-2 border-primary bg-white text-primary hover:bg-primary/10 cursor-pointer"
                    >
                      <Minus className="size-7" strokeWidth={3} />
                    </Button>
                    <span className="w-10 text-center text-2xl font-bold" aria-label={`Quantity ${qty}`}>
                      {qty}
                    </span>
                    <Button
                      aria-label={`Add one more ${item.name}`}
                      onPress={() => addToCart(item)}
                      className="size-14 rounded-full bg-gold text-gold-foreground hover:bg-gold-hover cursor-pointer"
                    >
                      <Plus className="size-7" strokeWidth={3} />
                    </Button>
                  </div>

                  <p className="w-28 text-right text-2xl font-bold">{formatPrice(item.price * qty)}</p>
                </li>
              ))}
            </ul>

            {/* TOTAL */}
            <div className="flex items-center justify-between rounded-2xl bg-primary p-6 text-primary-foreground">
              <p className="text-2xl font-bold uppercase tracking-wider">Total</p>
              <p className="text-4xl font-bold">{formatPrice(total)}</p>
            </div>

            {/* CHECKOUT */}
            <DialogTrigger isOpen={checkoutOpen} onOpenChange={handleCheckoutOpenChange}>
              <Button className="h-16 w-full text-xl font-bold cursor-pointer">
                Checkout
              </Button>

              <ModalOverlay
                isDismissable
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
              >
                <Modal className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-xl">
                  <Dialog className="flex flex-col gap-4 outline-none">
                    {({ close }) =>
                      payment ? (
                        /* CONFIRMATION */
                        <div role="status" aria-live="polite" className="flex flex-col items-center gap-4 text-center">
                          <payment.confirmIcon className="size-16 text-green-600" />
                          <Heading slot="title" className="text-3xl font-bold">
                            {payment.confirmTitle}
                          </Heading>
                          <p className="text-xl">{payment.confirmText}</p>
                          <p className="text-2xl font-bold">Total: {formatPrice(total)}</p>
                          <div className="flex w-full gap-3 mt-2">
                            <Button
                              variant="outline"
                              onPress={() => setPayment(null)}
                              className="h-16 flex-1 border-2 border-primary bg-white text-xl font-semibold text-primary hover:bg-primary/10 cursor-pointer"
                            >
                              Go back
                            </Button>
                            <Button onPress={finishOrder} className="h-16 flex-1 text-xl font-bold cursor-pointer">
                              Done
                            </Button>
                          </div>
                        </div>
                      ) : (
                        /* PAYMENT CHOICES */
                        <>
                          <div className="flex items-center justify-between gap-4">
                            <Heading slot="title" className="text-3xl font-bold">
                              How would you like to pay?
                            </Heading>
                            <Button onPress={close} className="h-14 shrink-0 gap-2 px-5 text-xl font-bold cursor-pointer">
                              <X className="size-7" strokeWidth={3} />
                              Close
                            </Button>
                          </div>
                          <p className="text-xl text-muted-foreground">Total: {formatPrice(total)}</p>
                          <div className="flex flex-col gap-3">
                            {PAYMENT_OPTIONS.map((option) => (
                              <Button
                                key={option.id}
                                variant="outline"
                                onPress={() => setPayment(option)}
                                className="h-20 justify-start gap-4 border-2 px-6 text-xl font-semibold cursor-pointer"
                              >
                                <option.icon className="size-8" />
                                {option.label}
                              </Button>
                            ))}
                          </div>
                        </>
                      )
                    }
                  </Dialog>
                </Modal>
              </ModalOverlay>
            </DialogTrigger>
          </>
        )}
      </main>
    </div>
  );
}
