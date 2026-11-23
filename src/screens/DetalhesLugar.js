import { ScrollView, View, Text, Image, Alert, StyleSheet } from 'react-native';
import { Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useLugares } from '../context/LugaresContext';

export default function DetalhesLugar({ navigation, route }) {
  const { id } = route.params || {};
  const { getLugarById, marcarVisitado, removerLugar } = useLugares();
  const lugar = getLugarById(id);

  // Se o lugar foi removido ou não existe, mostra aviso e volta
  if (!lugar) {
    return (
      <View style={styles.container}>
        <Text style={styles.titulo}>Lugar não encontrado.</Text>
        <Button title="Voltar" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  function handleMarcarVisitado() {
    marcarVisitado(lugar.id);
    Alert.alert('Atualizado', 'Lugar marcado como Visitado.');
  }

  function handleRemover() {
    Alert.alert('Remover lugar', `Deseja remover "${lugar.nome}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: () => {
          removerLugar(lugar.id);
          navigation.goBack();
        },
      },
    ]);
  }

  const visitado = lugar.status === 'Visitado';

  return (
    <ScrollView style={styles.container}>
      <Image
        source={
          lugar.foto ? { uri: lugar.foto } : require('../../assets/icon.png')
        }
        style={styles.foto}
      />

      <View style={styles.conteudo}>
        <Text style={styles.nome}>{lugar.nome}</Text>
        <View
          style={[
            styles.badge,
            { backgroundColor: visitado ? '#2e7d32' : '#f9a825' },
          ]}
        >
          <Text style={styles.badgeTexto}>{lugar.status}</Text>
        </View>

        <Text style={styles.label}>Descrição</Text>
        <Text style={styles.valor}>{lugar.descricao}</Text>

        <Text style={styles.label}>Endereço</Text>
        <Text style={styles.valor}>
          {lugar.rua}, {lugar.numero} — {lugar.cidade}/{lugar.estado}
        </Text>

        <Text style={styles.label}>Localização</Text>
        <MapView
          style={styles.mapa}
          initialRegion={{
            latitude: lugar.latitude,
            longitude: lugar.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          scrollEnabled={false}
          zoomEnabled={false}
          pitchEnabled={false}
          rotateEnabled={false}
        >
          <Marker
            coordinate={{ latitude: lugar.latitude, longitude: lugar.longitude }}
            title={lugar.nome}
          />
        </MapView>

        <View style={styles.acoes}>
          <Button
            title="Editar"
            onPress={() => navigation.navigate('CadastroLugar', { lugar })}
          />
          {!visitado && (
            <Button
              title="Marcar como Visitado"
              color="#2e7d32"
              onPress={handleMarcarVisitado}
            />
          )}
          <Button title="Remover" color="#c62828" onPress={handleRemover} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  foto: { width: '100%', height: 220, backgroundColor: '#eee' },
  conteudo: { padding: 16, paddingBottom: 32 },
  nome: { fontSize: 22, fontWeight: 'bold', color: '#222' },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 12,
    marginTop: 8,
  },
  badgeTexto: { color: '#fff', fontSize: 12, fontWeight: 'bold' },
  label: { fontSize: 13, fontWeight: 'bold', color: '#555', marginTop: 16 },
  valor: { fontSize: 15, color: '#222', marginTop: 4 },
  mapa: { width: '100%', height: 180, borderRadius: 8, marginTop: 8 },
  acoes: { marginTop: 24, gap: 8 },
});