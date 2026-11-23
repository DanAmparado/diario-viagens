import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import AppNavigator from './src/navigation/AppNavigator';
import { LugaresProvider } from './src/context/LugaresContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <LugaresProvider>
        <NavigationContainer>
          <AppNavigator />
          <StatusBar style="auto" />
        </NavigationContainer>
      </LugaresProvider>
    </SafeAreaProvider>
  );
}