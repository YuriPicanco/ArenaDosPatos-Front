import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

const createLoginFormSchema = z.object({
  email: z.string().email("Formato de email inválido").toLowerCase(),
  password: z.string().min(6, "A senha precisa de no minimo 6 caracteres"),
});

interface LoginForm {
  email: string;
  password: string;
}

type createLoginFormData = z.infer<typeof createLoginFormSchema>;

const Login = () => {
  const [LoginError, setLoginError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createLoginFormData>({
    resolver: zodResolver(createLoginFormSchema),
  });

  const loginHandleSubmit = async (data: LoginForm): Promise<void> => {
    try {
      const response = await axios.post(
        "http://localhost:5000/auth/login",
        data
      );

      localStorage.setItem(
        "accessToken",
        JSON.stringify(response.data.accessToken)
      );
      localStorage.setItem("infoUser", JSON.stringify(response.data.infoUser));
      window.location.href = "/agenda";
    } catch (err: any) {
      setLoginError(err.message);
    }
  };

  return (
    <div className="flex flex-col">
      <Card className="text-black">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Arena dos Patos</CardDescription>
        </CardHeader>
        <form
          onSubmit={handleSubmit(loginHandleSubmit)}
          className="flex flex-col gap-2 min-w-[350px] max-w-[350px]"
        >
          <div>
            <Input type="email" {...register("email")} placeholder="email" />
            {errors.email && (
              <span className="text-red-400">{errors.email.message}</span>
            )}
          </div>
          <div>
            <Input
              type="password"
              {...register("password")}
              placeholder="senha"
            />
            {errors.password && (
              <span className="text-red-400">{errors.password.message}</span>
            )}
          </div>
          <div className="flex justify-around">
            <Button
              variant="outline"
              className="w-32 hover:bg-emerald-500 border-0"
            >
              Login
            </Button>
            <Button
              onClick={() => (window.location.href = "/cadastro")}
              variant="outline"
              className="w-32 bg-slate-400 hover:bg-emerald-400 border-0"
            >
              Cadastro
            </Button>
          </div>
        </form>
      </Card>
      {LoginError && <span className="text-red-400">{LoginError}</span>}
    </div>
  );
};

export default Login;
