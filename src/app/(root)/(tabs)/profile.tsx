import { useAuth, useUser } from "@clerk/expo";
import { router } from "expo-router";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
  const { signOut } = useAuth();
  const { user } = useUser();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/(auth)/sign-in");

      console.log(user, " signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-50">
      <Text className="text-xl font-bold text-blue-500">Profile</Text>
      <TouchableOpacity
        onPress={handleSignOut}
        className="mt-4 rounded bg-red-500 px-4 py-2"
      >
        <Text className="text-white font-bold">Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
