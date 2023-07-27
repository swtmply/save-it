import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

const Header = () => {
  return (
    <div className="flex justify-between py-4">
      <div className="flex items-center gap-3">
        <Image
          src="/saveit-logo.svg"
          height={28}
          width={22}
          alt="save it logo"
        />
        <h1 className="font-semibold tracking-tight text-xl">Save It</h1>
      </div>
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
};

export default Header;
