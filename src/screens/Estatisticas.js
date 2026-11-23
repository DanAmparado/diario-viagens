import { View, Text, StyleSheet } from 'react-native';

export default function Estatisticas() {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Estatísticas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  titulo: { fontSize: 22, fontWeight: 'bold' },
});