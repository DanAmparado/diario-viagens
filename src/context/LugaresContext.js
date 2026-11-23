import { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@diario_viagens:lugares';

const LugaresContext = createContext({});

export function LugaresProvider({ children }) {
  const [lugares, setLugares] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // 1. Carrega do AsyncStorage quando o app inicia
  useEffect(() => {
    (async () => {
      try {
        const json = await AsyncStorage.getItem(STORAGE_KEY);
        if (json) setLugares(JSON.parse(json));
      } catch (e) {
        console.warn('Erro ao carregar lugares do AsyncStorage', e);
      } finally {
        setCarregando(false);
      }
    })();
  }, []);

  // 2. Salva no AsyncStorage sempre que a lista muda
  //    (só depois do carregamento inicial terminar, para não sobrescrever com [])
  useEffect(() => {
    if (carregando) return;
    (async () => {
      try {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(lugares));
      } catch (e) {
        console.warn('Erro ao salvar lugares no AsyncStorage', e);
      }
    })();
  }, [lugares, carregando]);

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

  function getLugarById(id) {
    return lugares.find((l) => l.id === id);
  }

  return (
    <LugaresContext.Provider
      value={{
        lugares,
        carregando,
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