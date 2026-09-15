import React from "react";
import { cn } from "cn";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
interface Waitlist1Props {
  className?: string;
}

const Waitlist1 = ({ className }: Waitlist1Props) => {
  return (
    <section
      className={cn(
        "flex h-svh max-h-[1200px] min-h-[600px] items-center justify-center overflow-hidden py-32",
        className,
      )}
    >
      <div className="container flex w-full flex-col items-center justify-center px-4 md:h-full">
        <h2 className="relative z-20 py-2 text-center font-sans text-5xl font-semibold tracking-tighter md:py-10 lg:text-8xl">
          join the waitlist
        </h2>
        <p className="text-md mx-auto max-w-xl text-center text-muted-foreground lg:text-lg">
          early access is opening soon. leave your email and we will let you
          know when galvanise is ready for your codebase.
        </p>
        <div className="relative z-20 mt-10 flex w-full max-w-md items-center gap-3 rounded-full p-1">
          <Input
            className="h-10 w-full rounded-xl border-none bg-muted shadow-none ring-0 focus-visible:ring-0 focus-visible:outline-none active:ring-0 active:outline-0"
            placeholder="enter your email"
          />
          <Button className="h-10 rounded-xl">join the waitlist</Button>
        </div>
      </div>
    </section>
  );
};

export { Waitlist1 };
