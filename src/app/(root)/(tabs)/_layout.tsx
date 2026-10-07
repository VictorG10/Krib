import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { NativeTabs } from "expo-router/unstable-native-tabs";
import { Platform } from "react-native";
import { useUserStore } from "../../../../stores/userStore";

const AndroidTabs = () => {
  const isAdmin = useUserStore((state) => state?.isAdmin);

  // return (
  //   <NativeTabs
  //     backgroundColor="#F9FAFB"
  //     indicatorColor={"#D1D5DB"}
  //     rippleColor="transparent"
  //     labelVisibilityMode="labeled"
  //     // tintColor={"#2563EB"}
  //     iconColor={{
  //       default: "#000000",
  //       selected: "#2563EB",
  //     }}

  //     labelStyle={{
  //       default: {
  //         color: "#000000",
  //       },
  //       selected: {
  //         color: "#2563EB",
  //       },
  //     }}
  //   >
  //     <NativeTabs.Trigger name="index">
  //       <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
  //       <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
  //     </NativeTabs.Trigger>

  //     <NativeTabs.Trigger name="search">
  //       <NativeTabs.Trigger.Icon sf="magnifyingglass" md="search" />
  //       <NativeTabs.Trigger.Label>Search</NativeTabs.Trigger.Label>
  //     </NativeTabs.Trigger>

  //     {isAdmin && (
  //       <NativeTabs.Trigger name="create">
  //         <NativeTabs.Trigger.Icon sf="plus.circle.fill" md="add" />
  //         <NativeTabs.Trigger.Label>Add Property</NativeTabs.Trigger.Label>
  //       </NativeTabs.Trigger>
  //     )}

  //     <NativeTabs.Trigger name="saved">
  //       <NativeTabs.Trigger.Icon sf="heart.fill" md="favorite" />
  //       <NativeTabs.Trigger.Label>Saved</NativeTabs.Trigger.Label>
  //     </NativeTabs.Trigger>

  //     <NativeTabs.Trigger name="profile">
  //       <NativeTabs.Trigger.Icon sf="person.fill" md="person" />
  //       <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
  //     </NativeTabs.Trigger>
  //   </NativeTabs>
  // );

  return (
    <>
      <Tabs screenOptions={{ headerShown: false }}>
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: "Search",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="search" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="create"
          options={{
            title: "Add Property",
            href: isAdmin ? undefined : null, // Disable navigation for non-admin users
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle" size={size} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="saved"
          options={{
            title: "Saved",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="heart" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

const IOSTabs = () => {
  const isAdmin = useUserStore((state) => state?.isAdmin);

  return (
    <NativeTabs
      backgroundColor="#F9FAFB"
      indicatorColor={"#D1D5DB"}
      rippleColor="transparent"
      labelVisibilityMode="labeled"
      // tintColor={"#2563EB"}
      iconColor={{
        default: "#000000",
        selected: "#2563EB",
      }}

      labelStyle={{
        default: {
          color: "#000000",
        },
        selected: {
          color: "#2563EB",
        },
      }}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon sf="house.fill" md="home" />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="search">
        <NativeTabs.Trigger.Icon sf="magnifyingglass" md="search" />
        <NativeTabs.Trigger.Label>Search</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      {isAdmin && (
        <NativeTabs.Trigger name="create">
          <NativeTabs.Trigger.Icon sf="plus.circle.fill" md="add" />
          <NativeTabs.Trigger.Label>Add Property</NativeTabs.Trigger.Label>
        </NativeTabs.Trigger>
      )}

      <NativeTabs.Trigger name="saved">
        <NativeTabs.Trigger.Icon sf="heart.fill" md="favorite" />
        <NativeTabs.Trigger.Label>Saved</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="profile">
        <NativeTabs.Trigger.Icon sf="person.fill" md="person" />
        <NativeTabs.Trigger.Label>Profile</NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
};

const TabsLayout = () => {
  return Platform.OS === "ios" ? <IOSTabs /> : <AndroidTabs />;
};

export default TabsLayout;
