import { AxiosResponse } from "axios";
import axiosInstance from "./axios";

const login = async (values: any): Promise<any> => {
  const { username, password } = values;
  let res: any = { status: 401, message: "Login failed!", data: null };
  if (!username || !password || username.trim().length == 0) {
    res.message = "Wrong input!";
    return res;
  }
  await axiosInstance
    .post("/user/login", {
      username,
      password,
    })
    .then((response: AxiosResponse) => {
      if (response?.status === 200) return response;
    })
    .catch((err) => {
      console.log(err);
    });
  return res;
};

const register = async (form) => {
  const res_err = { status: 401, message: "Register failed!" };
  await axiosInstance
    .post("/user/register", form)
    .then((res) => {
      if (res?.status === 200) return res.data;
      return res_err;
    })
    .catch((err) => {
      console.log(err);
    });
  return res_err;
};

export { login, register };
