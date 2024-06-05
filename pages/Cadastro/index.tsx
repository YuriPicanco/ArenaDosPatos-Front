import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type createUserFormData = z.infer<typeof createUserFormSchema>;

const Cadastro = () => {
  const [output, setOutPut] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createUserFormData>({
    resolver: zodResolver(createUserFormSchema),
  });

  const createUser = async (data: createUserFormData) => {
    const responseCad = await axios.post("http://localhost:5000/user", data);

    if (!responseCad) return console.error("Erro na autenticação inicial");

    const responseToken = await axios.post("http://localhost:5000/auth/login", {
      email: data.email,
      password: data.password,
    });

    localStorage.setItem(
      "accessToken",
      JSON.stringify(responseToken.data.accessToken)
    );
    localStorage.setItem(
      "infoUser",
      JSON.stringify(responseToken.data.infoUser)
    );
    window.location.href = "/agenda";
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Cadastro</CardTitle>
        <CardDescription>Arena dos Patos</CardDescription>
      </CardHeader>
      <form
        onSubmit={handleSubmit(createUser)}
        action=""
        className="flex flex-col gap-2 min-w-[350px] max-w-[350px] text-black"
      >
        <div className="flex flex-col gap-1">
          <Input
            type="name"
            {...register("name")}
            placeholder="nome completo"
          />
          {errors.name && (
            <span className="text-red-400">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input type="email" {...register("email")} placeholder="email" />
          {errors.email && (
            <span className="text-red-400">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            type="date"
            {...register("date")}
            placeholder="Data de Nascimento"
          />
          {errors.date && (
            <span className="text-red-400">{errors.date.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input type="tel" {...register("phone")} placeholder="telefone" />
          {errors.phone && (
            <span className="text-red-400">{errors.phone.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-1">
          <Input
            type="password"
            {...register("password")}
            placeholder="senha"
          />
          {errors.password && (
            <span className="text-red-400">{errors.password.message}</span>
          )}
        </div>

        <Button
          type="submit"
          className="bg-amber-300 hover:bg-emerald-500 border-0"
        >
          Submit
        </Button>

        <pre>{output}</pre>
      </form>
    </Card>
  );
};

const createUserFormSchema = z.object({
  name: z
    .string()
    .min(9, "Coloque seu nome e sobrenome")
    .transform((name) => {
      return name
        .trim()
        .split(" ")
        .map((word) => {
          return word[0].toLocaleUpperCase().concat(word.substring(1));
        })
        .join(" ");
    }),
  email: z.string().email("Formato de email inválido").toLowerCase(),
  date: z.string(),
  password: z.string().min(6, "A senha precisa de no minimo 6 caracteres"),
  phone: z.string(),
});

export default Cadastro;
