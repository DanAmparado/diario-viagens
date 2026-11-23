import { createContext, useState, useContext } from 'react';

// Dados de exemplo só para testar a Lista e os Detalhes enquanto o Cadastro
// não está pronto. Remover na Etapa 4.
const LUGARES_INICIAIS = [
  {
    id: '1',
    nome: 'Museu do Ipiranga',
    descricao: 'Museu histórico da independência do Brasil.',
    rua: 'Rua dos Patriotas',
    numero: '20',
    cidade: 'São Paulo',
    estado: 'SP',
    status: 'Quero visitar',
    latitude: -23.5855,
    longitude: -46.6093,
    foto: 'https://picsum.photos/seed/museu/400/300',
  },
  {
    id: '2',
    nome: 'Cristo Redentor',
    descricao: 'Cartão postal do Rio de Janeiro.',
    rua: 'Parque Nacional da Tijuca',
    numero: 's/n',
    cidade: 'Rio de Janeiro',
    estado: 'RJ',
    status: 'Visitado',
    latitude: -22.9519,
    longitude: -43.2105,
    foto: 'https://picsum.photos/seed/cristo/400/300',
  },
  {
    id: '3',
    nome: 'Pelourinho',
    descricao: 'Centro histórico de Salvador.',
    rua: 'Largo do Pelourinho',
    numero: 's/n',
    cidade: 'Salvador',
    estado: 'BA',
    status: 'Quero visitar',
    latitude: -12.9714,
    longitude: -38.5014,
    foto: 'https://picsum.photos/seed/pelourinho/400/300',
  },
];

const LugaresContext = createContext({});

export function LugaresProvider({ children }) {
  const [lugares, setLugares] = useState(LUGARES_INICIAIS);

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