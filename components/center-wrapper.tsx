import { ReactNode } from "react";
import Header from "./header";

const CenterWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center [&>*]:min-w-[80rem] [&>*]:max-w-7xl gap-8">
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default CenterWrapper;
