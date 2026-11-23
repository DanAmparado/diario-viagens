import { View, Text, Button, StyleSheet } from 'react-native';

export default function CadastroLugar({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Cadastro de Lugar</Text>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
});