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
});

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [auth, setAuth] = useState<Auth>(initialState);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
