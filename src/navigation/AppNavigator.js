import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import ListaLugares from '../screens/ListaLugares';
import MapaLugares from '../screens/MapaLugares';
import Estatisticas from '../screens/Estatisticas';
import CadastroLugar from '../screens/CadastroLugar';
import DetalhesLugar from '../screens/DetalhesLugar';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Abas principais: Lista, Mapa e Estatísticas
function TabsPrincipais() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#1e88e5',
        tabBarInactiveTintColor: '#757575',
      }}
    >
      <Tab.Screen name="Lista" component={ListaLugares} options={{ title: 'Lista' }} />
      <Tab.Screen name="Mapa" component={MapaLugares} options={{ title: 'Mapa' }} />
      <Tab.Screen name="Estatisticas" component={Estatisticas} options={{ title: 'Estatísticas' }} />
    </Tab.Navigator>
  );
}

// Stack raiz: Tabs + Cadastro + Detalhes (podem ser abertas de qualquer aba)
export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Tabs"
        component={TabsPrincipais}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CadastroLugar"
        component={CadastroLugar}
        options={{ title: 'Cadastro' }}
      />
      <Stack.Screen
        name="DetalhesLugar"
        component={DetalhesLugar}
        options={{ title: 'Detalhes' }}
      />
    </Stack.Navigator>
  );
}