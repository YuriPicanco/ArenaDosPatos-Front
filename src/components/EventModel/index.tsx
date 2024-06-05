import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { useState } from "react";
import { Input } from "../ui/input";
import { z } from "zod";

interface IEventModel {
  eventoSelecionado: any;
  setEventoSelecionado: any;
}

const editSchedulingFormSchema = z.object({
  name: z.string().min(1, "O campo não pode ser vazio"),
  date: z.string().min(1, "O campo não pode ser vazio"),
  hour: z.string().min(1, "O campo não pode ser vazio"),
});

type editSchedulingFormData = z.infer<typeof editSchedulingFormSchema>;

const EventModel = ({
  eventoSelecionado: evento,
  setEventoSelecionado,
}: IEventModel) => {
  const handleEventClose = () => {
    setEventoSelecionado(null);
  };

  return (
    <Card className="min-w-[15vw] max-w-[15vw] max-h-[50vh] min-h-[50vh] text-left mt-[50px]">
      <div className="flex flex-col gap-2 text-black">
        <Button
          className="bg-red-600 hover:bg-red-700 ml-[70%] mt-[5px] mb-[15px] max-w-[2vw] max-h-[3vh] border-0 rounded"
          onClick={handleEventClose}
        >
          X
        </Button>
        <CardContent className="flex flex-col gap-2 text-black">
          <div>
            <span className="text-xl">Jogador</span>:
            <span>{`${evento.title}`}</span>
          </div>
          <div>
            <span>Data</span>:
            <span>
              {`${new Date(evento.start).getDate().toLocaleString()}`}/
              {`${new Date(evento.start).getMonth() + 1}`}/
              {`${new Date(evento.start).getFullYear().toString()}`}
            </span>
          </div>
          <div>
            <span>Termino</span>:
            <span>{`${evento.end.getHours().toLocaleString()}:${evento.end
              .getMinutes()
              .toString()
              .padStart(2, "0")}`}</span>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default EventModel;
