import { useEffect, useState } from "react";
import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const DragAndDropCalendar = withDragAndDrop(Calendar);
const localizer = momentLocalizer(moment);

const Calendario = ({
  setEventoSelecionado,
  setReservaCampo,
  setEventos,
  eventos,
}: any) => {
  const onEventDrop = (data: any) => {
    //Evento para alterar data de atividade apenas arrastando com o mouse
    const { start, end } = data;
    const eventosUpdate = eventos.map((evento: any) => {
      if (evento.id === data.event.id) {
        return {
          ...evento,
          start: new Date(start),
          end: new Date(end),
        };
      }
      return evento;
    });
    setEventos(eventosUpdate);
  };

  const handleEventClick = (data: any) => {
    //Evento para selecionar uma atividade
    setEventoSelecionado(data);
  };

  const eventStyle = (event: any) => ({
    style: {
      backgroundColor: event.color,
    },
  });

  const CustomsToolbar = ({ label, onView, onNavigate, views }: any) => {
    const [itemText, setItemText] = useState("month");

    const VisualChange = (value: any) => {
      setItemText(value);
    };

    const openSchedulingModal = () => {
      setReservaCampo((state: any) => {
        return !state;
      });
    };

    useEffect(() => {
      onView(itemText);
    }, [itemText]);

    return (
      <nav className="flex justify-between">
        <section className="flex">
          <div className=" flex flex-col self-start">
            <div className="self-start">{label}</div>
            <Select onValueChange={VisualChange}>
              <SelectTrigger className="w-[10vw]">
                <SelectValue placeholder="Mês" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="month">Mês</SelectItem>
                  <SelectItem value="week">Semana</SelectItem>
                  <SelectItem value="day">Dia</SelectItem>
                  <SelectItem value="agenda">Agenda</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="self-end opacity-50">
            <Button
              onClick={() => onNavigate("TODAY")}
              className="bg-white border-0"
            >
              Hoje
            </Button>
          </div>

          <div className="self-end">
            <Button
              onClick={() => onNavigate("PREV")}
              className="self-end bg-transparent hover:bg-amber-400"
            >
              &lt;
            </Button>
            <Button
              onClick={() => onNavigate("NEXT")}
              className="self-end bg-transparent hover:bg-amber-400"
            >
              &gt;
            </Button>
          </div>
        </section>
        <section className="self-end">
          <div className="opacity-50 hover:bg-emerald-600">
            <Button onClick={openSchedulingModal} className="bg-emerald-500">
              Reservar Campo
            </Button>
          </div>
        </section>
      </nav>
    );
  };

  useEffect(() => {}, [eventos]);

  return (
    <div className="w-[70vw] h-[90vh] text-black-500">
      <DragAndDropCalendar
        defaultDate={moment().toDate()}
        defaultView="month"
        events={eventos} // carrega os eventos
        localizer={localizer}
        resizable
        onEventDrop={onEventDrop}
        onEventResize={onEventDrop}
        eventPropGetter={eventStyle}
        onSelectEvent={handleEventClick}
        components={{
          toolbar: CustomsToolbar, // carrega o menu personalizado do calendário
        }}
        className=" opacity-95"
      />
    </div>
  );
};

export default Calendario;
