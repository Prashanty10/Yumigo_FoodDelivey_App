import { Stack } from "expo-router";
import { configureReanimatedLogger } from "react-native-reanimated";

configureReanimatedLogger({
  strict: false,
});

export default function RootLayout() {
  return <Stack screenOptions={{headerShown:false}} />;
}
