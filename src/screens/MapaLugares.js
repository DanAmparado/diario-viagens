import { View, Text, StyleSheet } from 'react-native';

export default function MapaLugares() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Mapa de Lugares</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  titulo: { fontSize: 22, fontWeight: 'bold' },
});