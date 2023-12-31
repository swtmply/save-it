"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import DatePicker from "../date-picker";
import { useToast } from "../ui/use-toast";
import { useTransition } from "react";
import { addAccountAction } from "@/actions/account";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "@radix-ui/react-icons";
import { Calendar } from "../ui/calendar";

const accountFormSchema = z.object({
  type: z.enum(["income", "expense"], {
    required_error: "Account type is required",
  }),
  category: z
    .string({ required_error: "Category is required" })
    .max(50, { message: "Category must only have 50 characters" }),
  amount: z
    .string()
    .regex(/^\d+$/, { message: "Amount should not have letters in it." })
    .max(10, { message: "Value exceeded maximum amount" }),
  date: z.date(),
});

export type AddAccountFormType = z.infer<typeof accountFormSchema>;

interface AddAccountFormProps {
  closeSheet: () => void;
}

const AddAccountForm = ({ closeSheet }: AddAccountFormProps) => {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const form = useForm<AddAccountFormType>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      amount: "0",
      date: new Date(),
    },
  });

  function onSubmit(values: AddAccountFormType) {
    startTransition(async () => {
      try {
        await addAccountAction(values);

        closeSheet();
        toast({
          title: "🎉 Account successfully inserted",
        });
      } catch (error) {
        toast({
          title: "❌ Something went wrong!",
          description:
            "There was a problem with your request. Please try again",
        });
      }
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 my-4">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Account Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select account type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="income">Income</SelectItem>
                  <SelectItem value="expense">Expense</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="Enter amount" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input placeholder="Enter category" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors hover:bg-inherit placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending}
          className={cn(
            "space-x-2 transition-all duration-500 ease-in-out relative pl-2",
            isPending && "pl-7"
          )}
        >
          <Loader2
            className={cn(
              "w-4 h-4 animate-spin absolute top-[.60rem] left-3 opacity-0 box-border transition-all duration-500 ease-in-out mx-auto",
              isPending && "opacity-100"
            )}
          />
          <span>{isPending ? "Submitting..." : "Submit"}</span>
        </Button>
      </form>
    </Form>
  );
};

export default AddAccountForm;
