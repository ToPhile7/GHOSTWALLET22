import { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar, View } from 'react-native';
import * as SystemUI from 'expo-system-ui';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { SimulationProvider } from '@/context/SimulationContext';

export default function RootLayout() {
  useFrameworkReady();

  useEffect(() => {
    SystemUI.setBackgroundColorAsync('#000000');
  }, []);

  return (
    <SimulationProvider>
      <View style={{ flex: 1, backgroundColor: '#000' }}>
        <StatusBar barStyle="light-content" backgroundColor="#000000" translucent={false} />
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
      </View>
    </SimulationProvider>
  );
}