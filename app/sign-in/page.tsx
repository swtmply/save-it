import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

const SignInPage = () => {
  return (
    <div className="flex min-h-screen max-h-screen">
      <div className="bg-amber-50/50 w-1/2 flex justify-center items-center">
        <Image
          src="/saveit-logo.svg"
          height={230}
          width={175}
          alt="save it logo"
        />
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <SignIn />
      </div>
    </div>
  );
};

export default SignInPage;
