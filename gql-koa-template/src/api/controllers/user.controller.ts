import { signUp, logIn } from "../../services/user.services";

//REGISTER REQUEST INTERFACE
interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

//LOGIN REQUEST INTERFACE
interface LoginRequest {
  email: string;
  password: string;
}

//REGISTERING USER
const handleRegister = async (ctx: any) => {
  try {
    const { name, email, password } = <RegisterRequest>ctx.request.body;
    //PASSING INTO METHOD IN USER.SERVICE
    const data = await signUp(name, email, password);
    ctx.body = {
      name: name,
      response: data,
    };
  } catch (error) {
    ctx.body(error);
  }
};

//LOGIN USER:
const handleLogin = async (ctx: any) => {
  const { email, password } = <LoginRequest>ctx.request.body;

  try {
    //PASSING INTO METHOD IN USER.SERVICE
    const data = await logIn(email, password);
    ctx.body = {
      status: "Successful Login",
      info: data,
    };
  } catch (error) {
    ctx.body = {
      status: "Unsuccessful Login",
      ErrorCode: error,
    };
  }
};

export { handleRegister, handleLogin };
