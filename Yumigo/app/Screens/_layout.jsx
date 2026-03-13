import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function handeltabbar() {
  return (
    <>
      <Tabs
        screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#ffffff",
        tabBarInactiveTintColor: "rgba(255,255,255,0.6)",

        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: "600",
        },

        tabBarStyle: {
          position: "absolute",
          bottom: 40,
          left: 20,
          right: 20,
          height: 65,
          backgroundColor: "#F3711C",
          borderRadius: 25,
          elevation: 1, 
          shadowColor: "#000", 
          shadowOpacity: 0.2,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 5 },
          marginHorizontal:40,

        },

        tabBarItemStyle: {
          justifyContent: "center",
          alignItems: "center",
          paddingVertical: 5,
        },
      }}
      >
        <Tabs.Screen
          name="Home"
          options={{
            title:"Home",
            tabBarIcon: ({ focused, size, color }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Cart"
          options={{
            title: "Cart",
            tabBarIcon: ({ focused, size, color }) => (
              <Ionicons
                name={focused ? "cart" : "cart-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Order"
          options={{
            title: "Order",
            tabBarIcon: ({ focused, size, color }) => (
              <Ionicons
                name={focused ? "receipt" : "receipt-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            title: "Profile",
            tabBarIcon: ({ focused, size, color }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
