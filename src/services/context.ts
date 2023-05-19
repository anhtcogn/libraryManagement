import React from "react";
import { IUser } from "../Types/user";

export type UserContextType = {
  user: IUser | null;
  setUser: (_user: IUser) => void;
};

export const UserContext = React.createContext<UserContextType | null>(null);

