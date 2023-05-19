import { message } from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { redirect } from "react-router";

interface Props {
  children: React.ReactNode;
}

interface AppContext {
  user: {
    isLogin: boolean;
  };
  handleLogin: (values: any) => void;
  books: any;
  getAllBook: () => void;
}

const AppContext = React.createContext<AppContext>(null);

export const AppProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState({
    isLogin: false,
  });
  const [books, setBooks] = useState();

  useEffect(() => {
    getAllBook();
  }, []);

  // const handleLogin = (values) => {
  //   const res: any = axios.post("http://localhost:8080/user/login", values);
  //   console.log(res)
  //   if (res.data.statusCode === "OK") {
  //     setUser({
  //       isLogin: true,
  //     });
  //     return redirect("/");
  //   }
  //   message.error("Vui lòng kiểm tra lại thông tin đăng nhập!");
  // };
  const handleLogin = async (values) => {
    try {
      const res = await axios.post("http://localhost:8080/user/login", values);
      console.log(res.data); // Check the response data

      if (res && res.data && res.data.statusCode === "OK") {
        setUser({
          isLogin: true,
        });
        return redirect("/");
      } else {
        message.error("Vui lòng kiểm tra lại thông tin đăng nhập!");
      }
    } catch (error) {
      console.error(error);
      // Handle any error that occurred during the request
    }
  };


  const getAllBook = async () => {
    const res = await axios.get("http://localhost:8080/book");
    setBooks(res.data);
  };

  return (
    <AppContext.Provider value={{ user, handleLogin, books, getAllBook }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  return useContext(AppContext) as AppContext;
};
