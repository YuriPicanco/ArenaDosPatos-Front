import React, { useEffect, useState } from "react";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import ListaUsuarios from "../../lib/listaUsuarios";
import ListaAgendamento from "@/lib/listaAgendamento";

const Listas = () => {
  const [tipoLista, setTipoLista] = useState(false);
  const [selectUser, setSelectUser] = useState("");
  const [registerList, setRegisterList] = useState([]);
  const [schedulingList, setSchedulingList] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [limite, setLimite] = useState(10);

  const ListaNaTela = async (e: any) => {
    setTipoLista((tipo) => !tipo);
  };

  useEffect(() => {
    console.log("tipoLista", tipoLista);
    setSchedulingList([]);
  }, [tipoLista]);

  const Voltar = () => {
    setPagina((prev) => {
      if (prev == 1) return prev;
      return prev - 1;
    });
    setLimite((prev) => {
      if (prev <= 10) return 10;
      return prev - 10;
    });
  };
  const Avancar = () => {
    setPagina((prev) => prev + 1);
    setLimite((prev) => prev + 10);
  };

  return (
    <section className="flex gap-2">
      <Card className="min-w-[25vw]">
        {
          tipoLista ? (
            <ListaUsuarios
              limite={limite}
              pagina={pagina}
              selectUser={selectUser}
              setSelectUser={setSelectUser}
              registerList={registerList}
              setRegisterList={setRegisterList}
              schedulingList={schedulingList}
              setSchedulingList={setSchedulingList}
            />
          ) : (
            <></>
          )
          // : (
          //   <ListaAgendamento
          //     selectUser={selectUser}
          //     setSelectUser={setSelectUser}
          //     registerList={registerList}
          //     setRegisterList={setRegisterList}
          //     schedulingList={schedulingList}
          //     setSchedulingList={setSchedulingList}
          //   />    )
        }
      </Card>
      <nav className="flex flex-col justify-end gap-2">
        <Button
          value="users"
          onClick={ListaNaTela}
          className="max-w-44 self-end rounded"
        >
          Lista usuários
        </Button>
        <div>
          <Button onClick={Voltar}>&lt;</Button>
          <Button onClick={Avancar}>&gt;</Button>
        </div>
        {/* <Button
          onClick={ListaNaTela}
          value="schedule"
          className="max-w-44 self-end rounded"
        >
          Lista de agendamento
        </Button> */}
      </nav>
    </section>
  );
};

export default Listas;
