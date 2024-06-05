import AgendaHora from "@/components/AgendaHora";
import Calendario from "@/components/Calendario";
import EventModel from "@/components/EventModel";
import convertSchedulingDataToString from "@/lib/convertSchedulingDataToString";
import { useState } from "react";
import eventosPadrao from "@/components/events/events.js";
import convertStringDataToNewDate from "@/lib/convertStringDataToNewDate";
import axios from "axios";
import { Button } from "@/components/ui/button";
const Agenda = () => {
  const objJson: any = localStorage.getItem("infoUser");
  const infoUser = JSON.parse(objJson);

  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [reservaCampo, setReservaCampo] = useState(null);
  const [eventos, setEventos] = useState(eventosPadrao);
  const [novaAtividade, setNovaAtividade] = useState(
    convertSchedulingDataToString({
      id: infoUser.id,
      title: infoUser.name,
      start: new Date(2024, 3, 18, 22, 0),
      end: new Date(2024, 3, 18, 23, 0),
      desc: "Nossa primeira atividade",
      color: "black",
      tipo: "atividade",
    })
  );

  const createScheduling = async (data: any) => {
    const objJson: any | null = localStorage.getItem("infoUser");
    const infoUser = JSON.parse(objJson);

    const dadosConvertidos = convertStringDataToNewDate({
      name: data.name,
      date: data.date,
      hour: data.hour,
      timefull: data.total,
    });
    const response = await axios.post("http://localhost:5000/scheduling/", {
      ...data,
      id: infoUser.id,
    });
    setEventos((prevEventos: any[]) => [
      ...prevEventos,
      {
        id: infoUser.id,
        title: dadosConvertidos.name,
        start: new Date(dadosConvertidos.dataIni),
        end: new Date(dadosConvertidos.dataFim),
        desc: "Partida de futebol",
        color: dadosConvertidos.color,
        tipo: "atividade",
      },
    ]);

    setReservaCampo(null);
  };

  return (
    <div className="flex gap-5 text-stone-950">
      {infoUser.role === "admin" ? (
        <Button
          className="self-end"
          onClick={() => (window.location.href = "/dashboard")}
        >
          Dashboard
        </Button>
      ) : (
        <></>
      )}
      <Calendario
        setEventoSelecionado={setEventoSelecionado}
        setReservaCampo={setReservaCampo}
        setEventos={setEventos}
        eventos={eventos}
      />
      {eventoSelecionado && (
        <EventModel
          eventoSelecionado={eventoSelecionado}
          setEventoSelecionado={setEventoSelecionado}
        />
      )}
      {reservaCampo && (
        <AgendaHora
          novaAtividade={novaAtividade}
          setReservaCampo={setReservaCampo}
          createScheduling={createScheduling}
        />
      )}
    </div>
  );
};

export default Agenda;
