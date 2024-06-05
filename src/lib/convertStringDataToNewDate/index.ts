const convertSchedulingStringToData = (objeto: any) => {
  const { name, date, hour, timefull } = objeto;
  var color;

  const [hora, minuto] = hour.split(":");
  const [dia, mes, ano] = date.split("/");
  const dataIni = new Date(ano, mes - 1, dia, hora, minuto);
  const dataFim = new Date(
    ano,
    mes - 1,
    dia,
    Number(hora) + Number(timefull),
    minuto
  );

  hora >= 12
    ? (color = "orange")
    : hora >= 18
    ? (color = "darkblue")
    : (color = "lightblue");

  objeto = {
    name,
    dataIni,
    dataFim,
    color,
  };

  return objeto;
};

export default convertSchedulingStringToData;
