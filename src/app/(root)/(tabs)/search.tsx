import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFilterStore } from "../../../../stores/filterStore";
import { Property } from "../../../../types";

const Search = () => {
  const [results, setResults] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const { openFilters } = useLocalSearchParams<{ openFilters?: string }>();

  useEffect(() => {
    if (openFilters === "true") {
      setShowFilters(true);
    }
  }, [openFilters]);

  const {
    search,
    type,
    bedrooms,
    minPrice,
    maxPrice,
    setBedrooms,
    setMaxPrice,
    setMinPrice,
    setSearch,
    setType,
  } = useFilterStore();

  return (
    <SafeAreaView className="flex-1  bg-gray-50">
      <View className="px-5 pt-4 pb-3">
        <Text className="text-2xl font-black text-gray-900 mb-4">
          Find Property
        </Text>

        <View className="flex-row items-center gap-3">
          <View
            className="flex-1 flex-row items-center bg-white rounded-2xl px-4 gap-3"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.06,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            <TextInput
              className="flex-1 py-3 text-gray-800 "
              placeholder="Search by title or city..."
              placeholderTextColor="#9CA3AF"
              value={search}
              onChangeText={setSearch}
              autoCapitalize="none"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Search;
