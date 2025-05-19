
import { GlobalProvider } from "@/context/globalContext";
import { Stack } from "expo-router";
import { RootSiblingParent } from 'react-native-root-siblings';
export default function RootLayout() {
  return <GlobalProvider>
    {/* <ImageBackground source={require('../assets/images/splash-icon.png')} /> */}
    <RootSiblingParent>
      <Stack>
        {/* <Stack.Screen name="index" options={{ headerShown: false }} /> */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </RootSiblingParent>
  </GlobalProvider>
}
