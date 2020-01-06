import { instance } from "./axios";

type Data = {
  username: string;
  password: string;
};

export const signIn = async (data: Data) => {
  return await instance.post("/users/login", data);
};
