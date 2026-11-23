import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useLugares } from '../context/LugaresContext';
import LugarItem from '../components/LugarItem';

export default function ListaLugares({ navigation }) {
  const { lugares } = useLugares();

  return (
    <View style={styles.container}>
      {lugares.length === 0 ? (
        <View style={styles.vazio}>
          <Text style={styles.vazioTexto}>Nenhum lugar cadastrado ainda.</Text>
          <Text style={styles.vazioDica}>
            Toque no botão abaixo para adicionar o primeiro.
          </Text>
        </View>
      ) : (
        <FlatList
          data={lugares}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <LugarItem
              lugar={item}
              onPress={() => navigation.navigate('DetalhesLugar', { id: item.id })}
            />
          )}
          contentContainerStyle={{ paddingVertical: 6 }}
        />
      )}

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CadastroLugar')}
      >
        <Text style={styles.fabTexto}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  vazio: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  vazioTexto: { fontSize: 16, fontWeight: 'bold', color: '#444' },
  vazioDica: { fontSize: 13, color: '#888', marginTop: 6, textAlign: 'center' },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1e88e5',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  fabTexto: { color: '#fff', fontSize: 30, lineHeight: 34, fontWeight: 'bold' },
});