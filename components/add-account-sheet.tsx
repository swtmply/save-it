"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import AddAccountForm from "./forms/add-account-form";
import { useState } from "react";

const AddAccountSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button>New Account</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <span className="uppercase text-xs max-w-fit text-blue-500 bg-blue-100/70 rounded-full py-1 px-4">
              beta
            </span>
            <p>Add new account</p>
          </SheetTitle>
          <SheetDescription>
            Please insert data carefully because on this version you can&apos;t
            do anything about the data you inserted.
          </SheetDescription>
        </SheetHeader>
        <AddAccountForm closeSheet={() => setIsOpen(false)} />
      </SheetContent>
    </Sheet>
  );
};

export default AddAccountSheet;
