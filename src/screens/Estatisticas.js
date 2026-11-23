import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-svg-charts';
import { Text as SvgText } from 'react-native-svg';
import { useLugares } from '../context/LugaresContext';
import LegendaGrafico from '../components/LegendaGrafico';

// Cores por status (mesmas usadas nos badges da lista e nos marcadores do mapa)
const CORES_STATUS = {
  Visitado: '#2e7d32',
  'Quero visitar': '#f9a825',
};

// Paleta para as cidades (cicla se houver mais cidades que cores)
const CORES_CIDADES = [
  '#1e88e5', '#8e24aa', '#e53935', '#00897b',
  '#fb8c00', '#3949ab', '#43a047', '#6d4c41',
];

// Renderiza o valor dentro de cada fatia (herdado do exemplo do professor)
function Labels({ slices }) {
  return slices.map((slice, index) => {
    const { pieCentroid, data } = slice;
    if (!data.value) return null;
    return (
      <SvgText
        key={index}
        x={pieCentroid[0]}
        y={pieCentroid[1]}
        fill="#fff"
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize={14}
        fontWeight="bold"
      >
        {data.value}
      </SvgText>
    );
  });
}

export default function Estatisticas() {
  const { lugares } = useLugares();

  // ---- Gráfico 1: quantidade por status ----
  const totalVisitado = lugares.filter((l) => l.status === 'Visitado').length;
  const totalQueroVisitar = lugares.filter((l) => l.status === 'Quero visitar').length;

  const dadosStatus = [
    { key: 'Visitado', value: totalVisitado, svg: { fill: CORES_STATUS.Visitado } },
    { key: 'Quero visitar', value: totalQueroVisitar, svg: { fill: CORES_STATUS['Quero visitar'] } },
  ].filter((d) => d.value > 0);

  const legendaStatus = [
    { label: 'Visitado', valor: totalVisitado, cor: CORES_STATUS.Visitado },
    { label: 'Quero visitar', valor: totalQueroVisitar, cor: CORES_STATUS['Quero visitar'] },
  ];

  // ---- Gráfico 2: quantidade por cidade ----
  const contagemCidades = {};
  lugares.forEach((l) => {
    const c = (l.cidade || 'Sem cidade').trim();
    contagemCidades[c] = (contagemCidades[c] || 0) + 1;
  });

  const cidadesOrdenadas = Object.entries(contagemCidades).sort((a, b) => b[1] - a[1]);

  const dadosCidades = cidadesOrdenadas.map(([cidade, qtd], idx) => ({
    key: cidade,
    value: qtd,
    svg: { fill: CORES_CIDADES[idx % CORES_CIDADES.length] },
  }));

  const legendaCidades = cidadesOrdenadas.map(([cidade, qtd], idx) => ({
    label: cidade,
    valor: qtd,
    cor: CORES_CIDADES[idx % CORES_CIDADES.length],
  }));

  // Sem nenhum lugar cadastrado, mostra estado vazio
  if (lugares.length === 0) {
    return (
      <View style={styles.centro}>
        <Text style={styles.titulo}>Estatísticas</Text>
        <Text style={styles.vazio}>Cadastre lugares para ver as estatísticas.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.titulo}>Lugares por status</Text>
      <View style={styles.graficoBox}>
        <PieChart
          style={{ height: 200 }}
          data={dadosStatus}
          innerRadius="0%"
          outerRadius="80%"
          padAngle={0.02}
          animate
        >
          <Labels />
        </PieChart>
        <LegendaGrafico itens={legendaStatus} />
      </View>

      <Text style={styles.titulo}>Lugares por cidade</Text>
      <View style={styles.graficoBox}>
        <PieChart
          style={{ height: 200 }}
          data={dadosCidades}
          innerRadius="0%"
          outerRadius="80%"
          padAngle={0.02}
          animate
        >
          <Labels />
        </PieChart>
        <LegendaGrafico itens={legendaCidades} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  centro: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  titulo: { fontSize: 18, fontWeight: 'bold', color: '#222', marginTop: 8, marginBottom: 12 },
  graficoBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 2,
  },
  vazio: { fontSize: 14, color: '#888', textAlign: 'center', marginTop: 8 },
});