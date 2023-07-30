import { ReactNode } from "react";
import Header from "./header";

const CenterWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex flex-col items-center lg:[&>*]:min-w-[80rem] lg:[&>*]:max-w-7xl gap-8 px-2 lg:px-0">
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default CenterWrapper;
