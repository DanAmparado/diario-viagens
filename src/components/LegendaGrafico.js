import { View, Text, StyleSheet } from 'react-native';

// Legenda reutilizável: bolinha colorida + rótulo + valor.
export default function LegendaGrafico({ itens }) {
  return (
    <View style={styles.container}>
      {itens.map((item) => (
        <View key={item.label} style={styles.item}>
          <View style={[styles.cor, { backgroundColor: item.cor }]} />
          <Text style={styles.texto}>
            {item.label}: <Text style={styles.valor}>{item.valor}</Text>
          </Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginTop: 16, gap: 8 },
  item: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  cor: { width: 14, height: 14, borderRadius: 7 },
  texto: { fontSize: 14, color: '#333' },
  valor: { fontWeight: 'bold' },
});