import { createContext, Dispatch, SetStateAction, useState } from "react";

type Auth = {
  user: string;
  pwd: string;
  roles: number[];
  accessToken: string;
};

type AuthContextType = {
  auth: Auth;
  setAuth: Dispatch<SetStateAction<Auth>>;
  persist: boolean;
  setPersist: Dispatch<SetStateAction<boolean>>;
};

const initialState: Auth = {
  user: "",
  pwd: "",
  roles: [],
  accessToken: "",
};

const AuthContext = createContext<AuthContextType>({
  auth: initialState,
  setAuth: () => {},
  persist: false,
  setPersist: () => {},
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<Auth>(initialState);
  const [persist, setPersist] = useState<boolean>(
    JSON.parse(localStorage.getItem("persist") ?? "") || false
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
