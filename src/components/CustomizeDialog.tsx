"use client";
/**
 * CUSTOMIZE BUTTON + POPUP
 * The "Customize" button and the popup it opens, used on menu cards and product pages.
 * For each option group of the item (Patties, Mushrooms) it shows a photo,
 * a label and pill buttons. The customer picks one choice per group, and the
 * standard choice starts out selected. The price updates as choices change, and
 * "Add to order" adds the item with its choices to the order.
 * Option groups and prices come from src/data/menu.ts.
 */

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  Heading,
  Label,
  Modal,
  ModalOverlay,
  RadioButton,
  RadioField,
  RadioGroup,
} from "react-aria-components";
import { Plus, SlidersHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { MenuItem, OptionGroup } from "@/data/menu";
import { useUserCartStore } from "@/stores/userCartStore";
import { toast } from "sonner";

const formatPrice = (n: number) => `$${n.toFixed(2)}`;

/** One chosen option per group, as stored on the cart item. */
export type Selection = { group: string; label: string; price: number; isDefault: boolean };

const defaultIndex = (g: OptionGroup) => g.defaultChoice ?? 0;

/** Photo for an option group. Shows a round placeholder if there is no photo or it fails to load. */
function GroupImage({ src }: { src?: string }) {
  const [failed, setFailed] = useState(false);
  if (!src || failed) {
    return <div aria-hidden className="size-24 shrink-0 rounded-full bg-zinc-200" />;
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="" onError={() => setFailed(true)} className="size-24 shrink-0 object-contain" />
  );
}

export function CustomizeDialog({
  item,
  className,
  onAdded,
}: {
  item: MenuItem;
  className?: string;
  onAdded?: () => void; // called after the customized item is added (e.g. go back to the menu)
}) {
  const { addToCart } = useUserCartStore();
  const groups = item.options ?? [];

  const initialChoices = () => Object.fromEntries(groups.map((g) => [g.name, String(defaultIndex(g))]));
  const [open, setOpen] = useState(false);
  // group name -> index of the chosen choice (as a string, which is what RadioGroup uses)
  const [chosen, setChosen] = useState<Record<string, string>>(initialChoices);

  const selections: Selection[] = groups.map((g) => {
    const index = Number(chosen[g.name] ?? defaultIndex(g));
    const choice = g.choices[index];
    return { group: g.name, label: choice.label, price: choice.price ?? 0, isDefault: index === defaultIndex(g) };
  });
  const price = item.price + selections.reduce((sum, s) => sum + s.price, 0);

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
    if (!isOpen) setChosen(initialChoices()); // start fresh next time
  }

  function addCustomized() {
    const changes = selections.filter((s) => !s.isDefault);
    addToCart({
      ...item,
      basePrice: item.price,
      price,
      selections: changes, // only what differs from the standard item
      // Same item with the same choices = same line on the order page
      key: [item.name, ...changes.map((s) => `${s.group}:${s.label}`)].join("|"),
    });
    toast.success(`${item.name} added`);
    handleOpenChange(false);
    onAdded?.();
  }

  return (
    <DialogTrigger isOpen={open} onOpenChange={handleOpenChange}>
      <Button
        variant="outline"
        aria-label={`Customize ${item.name}`}
        className={`h-14 gap-2 border-2 border-primary bg-white px-4 text-xl font-semibold text-primary hover:bg-primary/10 cursor-pointer ${className ?? ""}`}
      >
        <SlidersHorizontal className="size-6" />
        Customize
      </Button>

      <ModalOverlay isDismissable className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
        <Modal className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl bg-white shadow-xl">
          <Dialog className="flex min-h-0 flex-col outline-none">
            {({ close }) => (
              <>
                {/* HEADER (cream band) */}
                <div className="flex items-start justify-between gap-4 bg-background px-8 py-6">
                  <div>
                    <Heading slot="title" className="font-serif text-4xl font-bold text-foreground">
                      Customize Your {item.name}
                    </Heading>
                    <p className="mt-1 text-xl text-muted-foreground">
                      Choose your preferences before adding to your order
                    </p>
                  </div>
                  <Button
                    onPress={close}
                    className="h-14 shrink-0 gap-2 rounded-full border-2 border-foreground/20 bg-white px-5 text-xl font-bold text-foreground hover:bg-zinc-100 cursor-pointer"
                  >
                    <X className="size-7" strokeWidth={3} />
                    Close
                  </Button>
                </div>

                {/* OPTION GROUPS (scrolls if long) */}
                <div className="flex min-h-0 flex-col gap-6 overflow-y-auto px-8 py-6">
                  {groups.map((g) => (
                    <RadioGroup
                      key={g.name}
                      orientation="horizontal"
                      value={chosen[g.name]}
                      onChange={(value) => setChosen((prev) => ({ ...prev, [g.name]: value }))}
                      className="flex items-center gap-6"
                    >
                      <GroupImage src={g.image} />
                      <div className="flex flex-1 flex-col gap-3">
                        <Label className="text-lg font-bold uppercase tracking-widest text-eyebrow">{g.name}</Label>
                        <div className="flex flex-wrap gap-4">
                          {g.choices.map((c, i) => (
                            <RadioField key={c.label} value={String(i)}>
                              <RadioButton className="flex h-16 min-w-40 flex-col items-center justify-center rounded-full border-2 border-primary bg-white px-6 text-primary cursor-pointer transition-colors hover:bg-primary/10 data-selected:bg-primary data-selected:text-primary-foreground">
                                <span className="text-lg font-bold uppercase tracking-widest">{c.label}</span>
                                {c.price ? <span className="text-base font-semibold">+{formatPrice(c.price)}</span> : null}
                              </RadioButton>
                            </RadioField>
                          ))}
                        </div>
                      </div>
                    </RadioGroup>
                  ))}
                </div>

                {/* FOOTER */}
                <div className="flex items-center justify-end gap-6 border-t-2 border-border px-8 py-5">
                  <p className="text-2xl font-bold text-foreground">{formatPrice(price)}</p>
                  <Button
                    onPress={addCustomized}
                    className="h-16 gap-3 rounded-full px-8 text-xl font-bold uppercase tracking-widest cursor-pointer"
                  >
                    Add to order
                    <Plus className="size-7" strokeWidth={3} />
                  </Button>
                </div>
              </>
            )}
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}
