import { createStackNavigator } from "@react-navigation/stack";

import BottomNav from "./BottomNav";

import LoginScreen from "../Screens/LoginScreen";
import RegistrationScreen from "../Screens/RegistrationScreen";
import CommentsScreen from "../Screens/CommentsScreen";
import HeaderNav from "../components/HeaderNav";
import MapScreen from "../Screens/MapScreen";
import CreatePostsScreen from "../Screens/CreatePostsScreen";

const RootNav = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Registration"
        component={RegistrationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BottomNav"
        component={BottomNav}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          headerShown: true,
          header: () => <HeaderNav title="Comments" />,
        }}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
        options={{
          headerShown: true,
          header: () => <HeaderNav title="Map" />,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootNav;
