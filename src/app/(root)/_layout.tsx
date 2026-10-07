import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";
import { useUserSync } from "../../../hooks/useUserSync";

const RootLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();

  // sync Clerk user -> Supabase
  useUserSync();

  if (!isLoaded) return null;
  if (!isSignedIn) return <Redirect href="/(auth)/sign-in" />;

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default RootLayout;
