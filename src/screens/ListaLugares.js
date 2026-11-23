import { View, Text, Button, StyleSheet } from 'react-native';

export default function ListaLugares({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lista de Lugares</Text>
      <Button title="Adicionar Lugar" onPress={() => navigation.navigate('CadastroLugar')} />
      <Button title="Abrir Detalhes (teste)" onPress={() => navigation.navigate('DetalhesLugar', { id: '1' })} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
});