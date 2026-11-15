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
  X,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function KioskTutorialButton() {
  const [open, setOpen] = useState(false);
  const [requested, setRequested] = useState<Option | null>(null);

  function handleOpenChange(isOpen: boolean) {
    setOpen(isOpen);
    if (!isOpen) setRequested(null); // reset so it opens on the choices next time
  }

  return (
      <DialogTrigger isOpen={open} onOpenChange={handleOpenChange}>

        <Button
            className="fixed top-6 right-75 z-40 h-16 gap-3 px-6 text-xl font-bold bg-cta text-cta-foreground shadow-lg hover:bg-cta-hover cursor-pointer"
        >
          <Link href="/KioskTutorial">
            Kiosk Tutorial
          </Link>

        </Button>
        <ModalOverlay
            isDismissable
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        >
          <Modal className="w-full max-w-xl rounded-2xl bg-white p-8 shadow-xl dark:bg-zinc-900">
            <Dialog className="flex flex-col gap-4 outline-none">
              <div role="status" aria-live="polite" className="flex flex-col items-center gap-4 text-center">
                <Heading slot="title" className="text-3xl font-bold">
                  Step 1: Getting to the Menu
                </Heading>
                <p className="text-xl">
                  In order to access the menu click on the <strong> Green </strong>
                  button that says "Browse Menu"
                </p>
              </div>
            </Dialog>
          </Modal>
        </ModalOverlay>

      </DialogTrigger>
  );
}