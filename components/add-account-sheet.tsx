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
import { Plus } from "lucide-react";

const AddAccountSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger
        asChild
        className="lg:relative lg:bottom-0 lg:right-0 fixed bottom-[5%] right-[5%]"
      >
        <Button className="flex gap-2 items-center rounded-full h-16 w-16 lg:h-fit lg:w-fit shadow-md lg:rounded-md">
          <Plus className="w-8 h-8 lg:hidden" />
          <span className="hidden lg:block">New Account</span>
        </Button>
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
