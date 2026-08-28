import { ReactNode } from "react";
import { AADAuthenticator } from "./azureAAD/Authenticator";

type Props = {
  children: ReactNode;
};

export const Authenticator = ({ children }: Props) => {
  return <AADAuthenticator>{children}</AADAuthenticator>;
};
