import { StatusBar } from "expo-status-bar";
import { Redirect, Tabs } from "expo-router";
import { Image, Text, View } from "react-native";
import { icons } from "../../constants";
import { useGlobalContext } from "../../context/GlobalProvider";

const TabIcon = ({ icon, color, name, focused, isCenter = false }) => {
  if (isCenter) {
    return (
      <View
        style={{
          backgroundColor: "#65B58B",
          width: 56,
          height: 56,
          borderRadius: 28,
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 30,
          shadowColor: "#65B58B",
          shadowOffset: {
            width: 0,
            height: 4,
          },
          shadowOpacity: 0.3,
          shadowRadius: 4,
          elevation: 8,
        }}
      >
        <Image
          source={icon}
          resizeMode="contain"
          tintColor="white"
          style={{ width: 24, height: 24 }}
        />
      </View>
    );
  }

  return (
    <View className="items-center justify-center">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={{ width: 30, height: 30 }}
      />
    </View>
  );
};

const TabLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: "#65B58B",
          tabBarInactiveTintColor: "#8E8E93",
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#F6F6F6",
            borderTopWidth: 0,
            height: 65,
            paddingHorizontal: 16,
            elevation: 0,
            shadowOpacity: 0,
          },
        }}
      >
        <Tabs.Screen
          name="(home)"
          key={Math.random()}
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
                isCenter={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="favoerites"
          key={Math.random()}
          options={{
            title: "Favourites",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.heart}
                color={color}
                name="Favourites"
                focused={focused}
                isCenter={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="cart"
          key={Math.random()}
          options={{
            title: "Cart",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.cart}
                color={color}
                name="Cart"
                focused={focused}
                isCenter={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="profile"
          key={Math.random()}
          options={{
            title: "Profile",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
                isCenter={focused}
              />
            ),
          }}
        />
      </Tabs>

      <StatusBar style="dark" />
    </>
  );
};

export default TabLayout;
