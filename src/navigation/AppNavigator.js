import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import ListaLugares from '../screens/ListaLugares';
import MapaLugares from '../screens/MapaLugares';
import Estatisticas from '../screens/Estatisticas';
import CadastroLugar from '../screens/CadastroLugar';
import DetalhesLugar from '../screens/DetalhesLugar';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function TabsPrincipais() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#1e88e5',
        tabBarInactiveTintColor: '#757575',
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tab.Screen
        name="Lista"
        component={ListaLugares}
        options={{
          title: 'Lista',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Mapa"
        component={MapaLugares}
        options={{
          title: 'Mapa',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Estatisticas"
        component={Estatisticas}
        options={{
          title: 'Estatísticas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bar-chart" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

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