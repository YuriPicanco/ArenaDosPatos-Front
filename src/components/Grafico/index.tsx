import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import Chart from "react-apexcharts";

const Grafico = () => {
  const [dadosMensais, setDadosMensais] = useState([{}]);
  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998],
    },
  });

  const [series, setSeries] = useState([
    {
      name: "series-1",
      data: [30, 40, 45, 50, 49, 60, 70, 91],
    },
  ]);

  useEffect(() => {
    const fetch = async () => {
      const dataAtual = moment();
      const datasGraficos8meses = [];

      for (let i = 0; i < 8; i++) {
        const data = moment(dataAtual).subtract(i, "months").startOf("month");
        datasGraficos8meses.push(data);
      }
      const newDadosMensais = [];
      for (const data of datasGraficos8meses) {
        const pimeiroDiaDoMes = data.startOf("month").toDate();
        const ultimoDiaDoMes = data.endOf("month").toDate();
        const agendamentos = await axios.get(
          `http://localhost:5000/scheduling/graphic?dataInicio=${pimeiroDiaDoMes}&dataFim=${ultimoDiaDoMes}`
        );

        newDadosMensais.unshift({
          mes: data.format("MMM YYYY"),
          tamanho: agendamentos.data,
        });
      }
      setDadosMensais(newDadosMensais);
    };

    fetch();
  }, []);

  useEffect(() => {
    console.log(dadosMensais[0]["tamanho"]["length"], series);
    if (dadosMensais.length > 0) {
      setOptions(() => ({
        chart: {
          id: "basic-bar",
        },
        xaxis: {
          categories: dadosMensais.map((item) => item.mes),
        },
      }));

      setSeries(() => [
        {
          name: "Agendas do mês",
          data: dadosMensais.map((item) => parseInt(item.tamanho.length)),
        },
      ]);
      console.log(dadosMensais, series);
    }
  }, [dadosMensais]);

  return (
    <div className="text-black">
      <Chart options={options} series={series} type="bar" width="500" />
    </div>
  );
};

export default Grafico;
