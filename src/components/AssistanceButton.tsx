"use client";

import { useState } from "react";
import {
  DialogTrigger,
  ModalOverlay,
  Modal,
  Dialog,
  Heading,
} from "react-aria-components";
import {
  BellRing,
  CreditCard,
  GlassWater,
  ClipboardList,
  CircleCheck,
  CircleQuestionMark,
  Nut,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Option = { id: string; label: string; icon: LucideIcon };

const OPTIONS: Option[] = [
  { id: "checkout", label: "Help with payment", icon: CreditCard },
  { id: "water", label: "Request water refill", icon: GlassWater },
  { id: "order", label: "Help with order", icon: ClipboardList },
  { id: "allergies", label: "Food allergies", icon: Nut },
  { id: "miscellaneous", label: "Something else", icon: CircleQuestionMark },
];

export function AssistanceButton() {
  const [open, setOpen] = useState(false);
  const [requested, setRequested] = useState<Option | null>(null);

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
    if (!isOpen) setRequested(null); // reset so it opens on the choices next time
  }

  return (
    <DialogTrigger isOpen={open} onOpenChange={handleOpenChange}>
      <Button
        className="fixed top-6 right-6 z-40 h-16 gap-3 px-6 text-lg font-bold bg-rose-500 text-white shadow-lg hover:bg-rose-600 cursor-pointer"
      >
        <BellRing className="size-6" />
        Call for assistance
      </Button>

      <ModalOverlay
        isDismissable
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      >
        <Modal className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-xl dark:bg-zinc-900">
          <Dialog className="flex flex-col gap-4 outline-none">
            {({ close }) =>
              requested ? (
                /* CONFIRMATION */
                <div role="status" aria-live="polite" className="flex flex-col items-center gap-4 text-center">
                  <CircleCheck className="size-16 text-green-600" />
                  <Heading slot="title" className="text-3xl font-bold">
                    Help is on the way!
                  </Heading>
                  <p className="text-xl">
                    A team member has been notified: <strong>{requested.label}</strong>.
                    Someone will be with you shortly.
                  </p>
                  <div className="flex w-full gap-3 mt-2">
                    <Button
                      variant="outline"
                      className="h-16 flex-1 text-xl cursor-pointer"
                      onPress={() => setRequested(null)}
                    >
                      Cancel request
                    </Button>
                    <Button
                      className="h-16 flex-1 text-xl bg-rose-500 text-white hover:bg-rose-600 cursor-pointer"
                      onPress={close}
                    >
                      Done
                    </Button>
                  </div>
                </div>
              ) : (
                /* CHOICES */
                <>
                  <Heading slot="title" className="text-3xl font-bold">
                    How can we help?
                  </Heading>
                  <div className="flex flex-col gap-3">
                    {OPTIONS.map((option) => (
                      <Button
                        key={option.id}
                        variant="outline"
                        onPress={() => setRequested(option)}
                        className="h-20 justify-start gap-4 px-6 text-xl font-semibold cursor-pointer"
                      >
                        <option.icon className="size-8" />
                        {option.label}
                      </Button>
                    ))}
                  </div>
                  <Button
                    variant="ghost"
                    onPress={close}
                    className="h-14 text-lg cursor-pointer"
                  >
                    Close
                  </Button>
                </>
              )
            }
          </Dialog>
        </Modal>
      </ModalOverlay>
    </DialogTrigger>
  );
}