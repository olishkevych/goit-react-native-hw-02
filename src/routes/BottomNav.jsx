import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";

import PostsScreen from "../Screens/PostsScreen";
import CreatePostsScreen from "../Screens/CreatePostsScreen";
import ProfileScreen from "../Screens/ProfileScreen";
import HeaderNav from "../components/HeaderNav";

import { Feather } from "@expo/vector-icons";

const BottomTabs = createBottomTabNavigator();

function BottomNav() {
  return (
    <BottomTabs.Navigator
      initialRouteName="PostsScreen"
      screenOptions={{
        unmountOnBlur: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#FFF",
        tabBarInactiveTintColor: "#212121CC",
        tabBarStyle: { height: 62, paddingHorizontal: 60 },
      }}
    >
      <BottomTabs.Screen
        name="Posts"
        component={PostsScreen}
        options={{
          header: () => <HeaderNav title="Posts" />,
          tabBarIcon: ({ color, focused }) => (
            <Feather
              name="grid"
              color={color}
              size={24}
              backgroundColor={focused ? "#FF6C00" : "#FFF"}
              style={styles.navIcon}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="CreatePosts"
        component={CreatePostsScreen}
        options={{
          tabBarStyle: { display: "none" },
          header: () => <HeaderNav title="New Post" />,
          tabBarIcon: ({ color, focused }) => (
            <Feather
              name="plus"
              color={color}
              size={24}
              backgroundColor={focused ? "#FF6C00" : "#FFF"}
              style={styles.navIcon}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <Feather
              name="user"
              color={color}
              size={24}
              backgroundColor={focused ? "#FF6C00" : "#FFF"}
              style={styles.navIcon}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

const styles = StyleSheet.create({
  navIcon: {
    height: 40,
    width: 70,
    borderRadius: 20,
    textAlign: "center",
    textAlignVertical: "center",
  },
});

export default BottomNav;
