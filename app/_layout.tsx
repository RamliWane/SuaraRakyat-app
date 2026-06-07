import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import "../global.css"
import Toast from 'react-native-toast-message';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="auth/login" options={{ headerShown: false }} />
        <Stack.Screen name="auth/register" options={{ headerShown: false }} />
        <Stack.Screen name="home/index" options={{ headerShown: false }} />
        <Stack.Screen name="laporan/index" options={{ headerShown: false }} />
        <Stack.Screen name="peta/index" options={{ headerShown: false }} />
        <Stack.Screen name="submission/index" options={{ headerShown: false }} />
        <Stack.Screen name="profile/index" options={{ headerShown: false }} />
        <Stack.Screen name="detail" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
      </Stack>
      <StatusBar style="auto" />
      <Toast />
      
    </ThemeProvider>
    </GestureHandlerRootView>
  );
}
