import { UserButton } from "@clerk/nextjs";

const RootPage = async () => {
  return (
    <div className="flex min-h-screen max-h-screen">
      Hello
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
};

export default RootPage;
