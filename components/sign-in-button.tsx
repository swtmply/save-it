"use client";

import { useClerk } from "@clerk/nextjs";
import { Button } from "./ui/button";

const SignInButton = () => {
  const { openSignIn } = useClerk();

  return (
    <Button variant="outline" onClick={() => openSignIn()}>
      SignInButton
    </Button>
  );
};

export default SignInButton;
