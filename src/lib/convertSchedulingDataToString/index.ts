const convertSchedulingDataToString = (objeto: any) => {
  const { id, title, start } = objeto;

  // Extrair data e hora inicial
  const dataInicial = start.toLocaleDateString();
  const horaInicial = start.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  // Criar novo objeto com as propriedades desejadas
  const novoObjeto = {
    id: id,
    name: title,
    "data inicial": dataInicial,
    "hora inicial": horaInicial,
  };

  return { ...novoObjeto };
};

export default convertSchedulingDataToString;
