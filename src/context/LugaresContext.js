import { createContext, useState, useContext } from 'react';

const LugaresContext = createContext({});

export function LugaresProvider({ children }) {
  const [lugares, setLugares] = useState([]);

  function adicionarLugar(lugar) {
    setLugares((prev) => [...prev, { ...lugar, id: String(Date.now()) }]);
  }

  function editarLugar(id, lugarAtualizado) {
    setLugares((prev) =>
      prev.map((l) => (l.id === id ? { ...l, ...lugarAtualizado } : l))
    );
  }

  function removerLugar(id) {
    setLugares((prev) => prev.filter((l) => l.id !== id));
  }

  function marcarVisitado(id) {
    setLugares((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: 'Visitado' } : l))
    );
  }

  // Atalho para a tela de Detalhes buscar o lugar pelo id
  function getLugarById(id) {
    return lugares.find((l) => l.id === id);
  }

  return (
    <LugaresContext.Provider
      value={{
        lugares,
        adicionarLugar,
        editarLugar,
        removerLugar,
        marcarVisitado,
        getLugarById,
      }}
    >
      {children}
    </LugaresContext.Provider>
  );
}

export function useLugares() {
  return useContext(LugaresContext);
}