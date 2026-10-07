import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateScreen() {
  return (
    <SafeAreaView className="flex-1 items-center justify-center bg-gray-50">
      <Text className="text-xl font-bold text-blue-500">Create Screen</Text>
    </SafeAreaView>
  );
}
