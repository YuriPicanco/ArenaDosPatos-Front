import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import convertStringDataToNewDate from "../../lib/convertStringDataToNewDate";

const createSchedulingFormSchema = z.object({
  name: z.string().min(1, "O campo não pode ser vazio"),
  date: z.string().min(1, "O campo não pode ser vazio"),
  hour: z.string().min(1, "O campo não pode ser vazio"),
  total: z.string().min(1, "O campo não pode ser vazio"),
});

type createSchedulingFormData = z.infer<typeof createSchedulingFormSchema>;

const AgendaHora = ({
  novaAtividade,
  // setNovaAtividade,
  setReservaCampo,
  createScheduling,
}: any) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<createSchedulingFormData>({
    resolver: zodResolver(createSchedulingFormSchema),
  });

  const handleEventClose = (e: any) => {
    setReservaCampo(null);
  };

  return (
    <div>
      <Card className="min-w-[15vw] max-w-[15vw] max-h-[50vh] min-h-[50vh] text-left mt-[50px]">
        <Button
          onClick={handleEventClose}
          className="bg-red-600 hover:bg-red-700 ml-[70%] mt-[5px] mb-[15px] max-w-[2vw] max-h-[3vh] border-0 rounded"
        >
          X
        </Button>
        <CardHeader>
          <CardTitle>Agendar Hora</CardTitle>
          <CardDescription>Arena dos Patos</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(createScheduling)}
            className="flex flex-col gap-2 text-black"
          >
            <div className="flex flex-col gap-1">
              <Input
                type="name"
                {...register("name")}
                value={`${novaAtividade["name"]}`}
                placeholder={`${novaAtividade["name"]}`}
                className="rounded"
              />
              {errors.name && (
                <span className="text-red-400">{errors.name.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Input
                type="text"
                placeholder={`${novaAtividade["data inicial"]}`}
                {...register("date")}
                className="rounded"
              />
              {errors.date && (
                <span className="text-red-400">{errors.date.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Input
                type="time"
                placeholder={`${novaAtividade.horaInicial}`}
                {...register("hour")}
                className="rounded"
              />
              {errors.hour && (
                <span className="text-red-400">{errors.hour.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Input
                type="text"
                placeholder={`Total de horas: 1`}
                {...register("total")}
                className="rounded"
              />
              {errors.total && (
                <span className="text-red-400">{errors.total.message}</span>
              )}
            </div>

            <Button
              type="submit"
              className="bg-yellow-300 hover:bg-emerald-400 border-0 rounded"
            >
              Confirmar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AgendaHora;
