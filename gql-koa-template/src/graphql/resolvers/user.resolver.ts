import { signUp, logIn } from "../../services/user.services";

export const resolver = {
  async login({ email, password }: { email: string; password: string }) {
    try {
      const data = await logIn(email, password);
      console.log(data);
      return data;
    } catch (error: any) {
      throw new Error(error.message);
    }
  },

  async register({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) {
    try {
      const data = await signUp(name, email, password);
      console.log(data);
      return data;
    } catch (error: any) {
      console.log(error.message);
      throw new Error(error.message);
    }
  },
};
