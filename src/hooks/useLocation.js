import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

// Hook personalizado que solicita permissão e retorna a localização atual.
// Baseado no repositório 4.DSM.GeoLocalizacao.2026.2 (src/hooks/useLocation.js).
export default function useLocation() {
  const [coords, setCoords] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ativo = true;

    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          if (ativo) {
            setErrorMsg('Permissão de localização negada.');
            setLoading(false);
          }
          return;
        }

        const loc = await Location.getCurrentPositionAsync({});
        if (ativo) {
          setCoords({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          });
          setLoading(false);
        }
      } catch (e) {
        console.warn('Erro no useLocation', e);
        if (ativo) {
          setErrorMsg('Não foi possível obter a sua localização.');
          setLoading(false);
        }
      }
    })();

    // Evita setState depois que o componente desmontou
    return () => { ativo = false; };
  }, []);

  return { coords, errorMsg, loading };
}