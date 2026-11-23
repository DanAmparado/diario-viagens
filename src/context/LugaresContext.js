import { createContext, useState, useContext } from 'react';

// Contexto global que guarda a lista de lugares e as funções de CRUD.
// Por enquanto é só o esqueleto — a lógica real entra na próxima etapa.
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

  return (
    <LugaresContext.Provider
      value={{ lugares, adicionarLugar, editarLugar, removerLugar, marcarVisitado }}
    >
      {children}
    </LugaresContext.Provider>
  );
}

// Hook para consumir o contexto nas telas
export function useLugares() {
  return useContext(LugaresContext);
}