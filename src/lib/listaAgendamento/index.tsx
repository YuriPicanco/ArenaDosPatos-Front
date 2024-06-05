import axios from "axios";
import { useEffect } from "react";
import convertSchedulingDataToString from "../convertSchedulingDataToString";

const ListaAgendamento = ({
  selectUser,
  setSelectUser,
  registerList,
  setRegisterList,
  schedulingList,
  setSchedulingList,
}) => {
  useEffect(() => {
    const fetchSchedu = async () => {
      try {
        const response = await axios.get("http://localhost:5000/scheduling");
        setSchedulingList(response.data.registerList);
        setSelectUser("");
        console.log(schedulingList);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSchedu();
  }, []);

  return (
    <div>
      {selectUser === "" ? (
        schedulingList.map((item) => {
          //   const dadosConvertidos = convertSchedulingDataToString
        })
      ) : (
        <>Alguma coisa</>
      )}
    </div>
  );
};

export default ListaAgendamento;
