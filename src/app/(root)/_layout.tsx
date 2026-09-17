import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";

const RootLayout = () => {
  const { isSignedIn, isLoaded } = useAuth();

  // sync Clerk user -> Supabase

  if (!isLoaded) {
    return null;
  }
  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
};

export default RootLayout;
