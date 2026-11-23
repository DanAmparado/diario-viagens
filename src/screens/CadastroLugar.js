import { View, Text, Button, StyleSheet } from 'react-native';

export default function CadastroLugar({ navigation, route }) {
  const lugar = route.params?.lugar;

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>
        {lugar ? `Editando: ${lugar.nome}` : 'Cadastro de Lugar'}
      </Text>
      <Text style={styles.dica}>
        (Formulário completo na próxima etapa)
      </Text>
      <Button title="Voltar" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 12, padding: 24 },
  titulo: { fontSize: 20, fontWeight: 'bold', textAlign: 'center' },
  dica: { fontSize: 13, color: '#888', textAlign: 'center' },
});