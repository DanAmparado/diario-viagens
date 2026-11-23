import { useState } from 'react';
import {
  ScrollView, View, Text, TextInput, Image, Alert,
  TouchableOpacity, StyleSheet, ActivityIndicator,
} from 'react-native';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { useLugares } from '../context/LugaresContext';

export default function CadastroLugar({ navigation, route }) {
  const lugarEmEdicao = route.params?.lugar;
  const { adicionarLugar, editarLugar } = useLugares();

  const [nome, setNome] = useState(lugarEmEdicao?.nome || '');
  const [descricao, setDescricao] = useState(lugarEmEdicao?.descricao || '');
  const [rua, setRua] = useState(lugarEmEdicao?.rua || '');
  const [numero, setNumero] = useState(lugarEmEdicao?.numero || '');
  const [cidade, setCidade] = useState(lugarEmEdicao?.cidade || '');
  const [estado, setEstado] = useState(lugarEmEdicao?.estado || '');
  const [status, setStatus] = useState(lugarEmEdicao?.status || 'Quero visitar');
  const [foto, setFoto] = useState(lugarEmEdicao?.foto || null);
  const [salvando, setSalvando] = useState(false);

  // Salva a foto na galeria do dispositivo
  async function salvarNaGaleria(uri) {
    try {
      const { status } = await MediaLibrary.requestPermissionsAsync(false, ['photo']);
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Não foi possível salvar a foto na galeria.');
        return;
      }
      await MediaLibrary.saveToLibraryAsync(uri);
    } catch (e) {
      console.warn('Erro ao salvar na galeria', e);
    }
  }

  async function tirarFoto() {
    const perm = await ImagePicker.requestCameraPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permissão negada', 'Precisamos de acesso à câmera para tirar a foto.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
      allowsEditing: true,
    });
    if (!result.canceled) {
      setFoto(result.assets[0].uri);
      await salvarNaGaleria(result.assets[0].uri);
    }
  }

  async function escolherDaGaleria() {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert('Permissão negada', 'Precisamos de acesso à galeria para escolher a foto.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.7,
      allowsEditing: true,
    });
    if (!result.canceled) {
      setFoto(result.assets[0].uri);
    }
  }

  async function handleSalvar() {
    // 1. Solicita e verifica a permissão de localização antes do geocode
    const { status: permStatus } = await Location.requestForegroundPermissionsAsync();
    if (permStatus !== 'granted') {
      Alert.alert(
        'Permissão de Localização Necessária',
        'Para converter o endereço em coordenadas, o app precisa da sua localização.'
      );
      return;
    }

    // 2. Validação dos campos obrigatórios
    if (!nome.trim() || !rua.trim() || !numero.trim() || !cidade.trim() || !estado.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha nome, rua, número, cidade e estado.');
      return;
    }

    // 3. Geocode + salvamento
    setSalvando(true);
    try {
      const enderecoCompleto = `${rua.trim()}, ${numero.trim()}, ${cidade.trim()}, ${estado.trim()}`;
      const resultados = await Location.geocodeAsync(enderecoCompleto);

      if (!resultados || resultados.length === 0) {
        Alert.alert(
          'Endereço não encontrado',
          'Não foi possível localizar este endereço. Verifique os dados e tente novamente.'
        );
        return;
      }

      const { latitude, longitude } = resultados[0];

      const lugar = {
        nome: nome.trim(),
        descricao: descricao.trim(),
        rua: rua.trim(),
        numero: numero.trim(),
        cidade: cidade.trim(),
        estado: estado.trim().toUpperCase(),
        status, // aqui é o status do lugar (state), não o da permissão
        foto,
        latitude,
        longitude,
      };

      if (lugarEmEdicao) {
        editarLugar(lugarEmEdicao.id, lugar);
      } else {
        adicionarLugar(lugar);
      }

      navigation.goBack();
    } catch (e) {
      console.warn('Erro ao salvar', e);
      Alert.alert(
        'Erro ao cadastrar',
        'Não foi possível converter o endereço em coordenadas. Verifique sua conexão e tente novamente.'
      );
    } finally {
      setSalvando(false);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.label}>Nome *</Text>
      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Ex: Cristo Redentor"
      />

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        value={descricao}
        onChangeText={setDescricao}
        multiline
        placeholder="Conte um pouco sobre o lugar"
      />

      <Text style={styles.label}>Rua *</Text>
      <TextInput style={styles.input} value={rua} onChangeText={setRua} placeholder="Ex: Av. Paulista" />

      <Text style={styles.label}>Número *</Text>
      <TextInput style={styles.input} value={numero} onChangeText={setNumero} keyboardType="numeric" placeholder="Ex: 1000" />

      <Text style={styles.label}>Cidade *</Text>
      <TextInput style={styles.input} value={cidade} onChangeText={setCidade} placeholder="Ex: São Paulo" />

      <Text style={styles.label}>Estado *</Text>
      <TextInput
        style={styles.input}
        value={estado}
        onChangeText={setEstado}
        placeholder="Ex: SP"
        autoCapitalize="characters"
        maxLength={2}
      />

      <Text style={styles.label}>Status</Text>
      <View style={styles.statusLinha}>
        {['Quero visitar', 'Visitado'].map((opcao) => (
          <TouchableOpacity
            key={opcao}
            style={[styles.statusBotao, status === opcao && styles.statusBotaoAtivo]}
            onPress={() => setStatus(opcao)}
          >
            <Text style={[styles.statusTexto, status === opcao && styles.statusTextoAtivo]}>
              {opcao}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.label}>Foto</Text>
      <View style={styles.fotoBotoes}>
        <TouchableOpacity style={styles.botaoSecundario} onPress={tirarFoto}>
          <Text style={styles.botaoSecundarioTexto}>Tirar foto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoSecundario} onPress={escolherDaGaleria}>
          <Text style={styles.botaoSecundarioTexto}>Galeria</Text>
        </TouchableOpacity>
      </View>
      {foto && <Image source={{ uri: foto }} style={styles.preview} />}

      <TouchableOpacity
        style={[styles.botaoSalvar, salvando && { opacity: 0.6 }]}
        onPress={handleSalvar}
        disabled={salvando}
      >
        {salvando ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.botaoSalvarTexto}>
            {lugarEmEdicao ? 'Salvar alterações' : 'Cadastrar lugar'}
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  label: { fontSize: 13, fontWeight: 'bold', color: '#555', marginTop: 14, marginBottom: 4 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    color: '#222',
  },
  textArea: { minHeight: 80, textAlignVertical: 'top' },
  statusLinha: { flexDirection: 'row', gap: 8, marginTop: 4 },
  statusBotao: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  statusBotaoAtivo: { backgroundColor: '#1e88e5', borderColor: '#1e88e5' },
  statusTexto: { fontSize: 14, color: '#444' },
  statusTextoAtivo: { color: '#fff', fontWeight: 'bold' },
  fotoBotoes: { flexDirection: 'row', gap: 8, marginTop: 4 },
  botaoSecundario: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#e3f2fd',
    alignItems: 'center',
  },
  botaoSecundarioTexto: { color: '#1565c0', fontWeight: 'bold' },
  preview: { width: '100%', height: 200, borderRadius: 8, marginTop: 10, backgroundColor: '#eee' },
  botaoSalvar: {
    marginTop: 24,
    backgroundColor: '#1e88e5',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  botaoSalvarTexto: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
});