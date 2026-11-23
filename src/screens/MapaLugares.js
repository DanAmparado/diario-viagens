import { useMemo } from 'react';
import {
  View, Text, StyleSheet, ActivityIndicator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLugares } from '../context/LugaresContext';
import useLocation from '../hooks/useLocation';

// Região de fallback caso o usuário negue a permissão de localização
// (centro aproximado do Brasil).
const REGIAO_PADRAO = {
  latitude: -14.235,
  longitude: -51.9253,
  latitudeDelta: 30,
  longitudeDelta: 30,
};

export default function MapaLugares({ navigation }) {
  const { lugares } = useLugares();
  const { coords, errorMsg, loading } = useLocation();

  // Região inicial: centraliza na localização atual ou usa o fallback.
  // useMemo garante que o objeto só é recriado quando coords muda.
  const regiaoInicial = useMemo(() => {
    if (coords) {
      return {
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      };
    }
    return REGIAO_PADRAO;
  }, [coords]);

  if (loading) {
    return (
      <View style={styles.centro}>
        <ActivityIndicator size="large" color="#1e88e5" />
        <Text style={styles.texto}>Obtendo sua localização...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {errorMsg && (
        <View style={styles.aviso}>
          <Text style={styles.avisoTexto}>{errorMsg}</Text>
        </View>
      )}

      <MapView style={styles.mapa} initialRegion={regiaoInicial}>
        {/* Marcador da localização atual (vem do hook useLocation) */}
        {coords && (
          <Marker
            coordinate={coords}
            title="Você está aqui"
            pinColor="blue"
          />
        )}

        {/* Marcador de cada lugar cadastrado. Ao tocar, abre os Detalhes. */}
        {lugares.map((lugar) => (
          <Marker
            key={lugar.id}
            coordinate={{ latitude: lugar.latitude, longitude: lugar.longitude }}
            title={lugar.nome}
            description={`${lugar.cidade} - ${lugar.estado} • ${lugar.status}`}
            pinColor={lugar.status === 'Visitado' ? 'green' : 'orange'}
            onPress={() => navigation.navigate('DetalhesLugar', { id: lugar.id })}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  mapa: { flex: 1 },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  texto: { color: '#666' },
  aviso: {
    backgroundColor: '#fff3cd',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ffeeba',
  },
  avisoTexto: { color: '#856404', fontSize: 12, textAlign: 'center' },
});