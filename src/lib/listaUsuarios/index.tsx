import axios from "axios";
import { useEffect, useState } from "react";
import convertSchedulingDataToString from "../convertSchedulingDataToString";

const ListaUsuarios = ({
  limite,
  pagina,
  selectUser,
  setSelectUser,
  registerList,
  setRegisterList,
  schedulingList,
  setSchedulingList,
}) => {
  const ListaReservasDoUsuario = async (user: any) => {
    try {
      const response = await axios.get(
        `http://localhost:5000/schedulingbyuser/${user._id}`
      );
      setRegisterList([]);
      setSelectUser(user.name);
      setSchedulingList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/user?limite=${limite}&pagina=${pagina}`
        );
        setRegisterList(response.data.registerList);
      } catch (err: any) {
        console.log(err.message);
      }
    };
    fetchUser();
  }, [pagina]);

  useEffect(() => {
    console.log("re-renderiza", schedulingList);
  }, [schedulingList]);

  return (
    <>
      <div className="flex flex-wrap gap-1 justify-center pt-2">
        {schedulingList.length > 0 ? (
          <div className="">
            {schedulingList.map((item: any) => {
              const dadosConvertidos = convertSchedulingDataToString({
                id: item.userId,
                title: selectUser,
                start: new Date(item.dataTime),
              });
              return (
                <div
                  key={dadosConvertidos.id}
                  className="bg-lime-400 rounded text-sm text-left min-w-full"
                >
                  <div>{selectUser}</div>
                  Data: {dadosConvertidos["data inicial"]}
                  <br></br>
                  Hora: {dadosConvertidos["hora inicial"]}
                </div>
              );
            })}
          </div>
        ) : (
          registerList.map((user: any) => (
            <div
              onClick={() => ListaReservasDoUsuario(user)}
              className="bg-lime-400 rounded"
              key={user._id}
            >
              {user.name}
              <br></br>
              {user.email}
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default ListaUsuarios;
