import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// Item da lista: foto em miniatura, nome, cidade e status.
export default function LugarItem({ lugar, onPress }) {
  const visitado = lugar.status === 'Visitado';

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image
        source={
          lugar.foto
            ? { uri: lugar.foto }
            : require('../../assets/icon.png')
        }
        style={styles.foto}
      />
      <View style={styles.info}>
        <Text style={styles.nome} numberOfLines={1}>
          {lugar.nome}
        </Text>
        <Text style={styles.cidade} numberOfLines={1}>
          {lugar.cidade} - {lugar.estado}
        </Text>
        <View
          style={[
            styles.badge,
            { backgroundColor: visitado ? '#2e7d32' : '#f9a825' },
          ]}
        >
          <Text style={styles.badgeTexto}>{lugar.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 8,
    marginHorizontal: 12,
    marginVertical: 6,
    elevation: 2,
    alignItems: 'center',
  },
  foto: { width: 80, height: 80, borderRadius: 8, backgroundColor: '#eee' },
  info: { flex: 1, marginLeft: 12 },
  nome: { fontSize: 16, fontWeight: 'bold', color: '#222' },
  cidade: { fontSize: 13, color: '#666', marginTop: 2 },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 12,
    marginTop: 6,
  },
  badgeTexto: { color: '#fff', fontSize: 11, fontWeight: 'bold' },
});