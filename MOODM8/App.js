import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import GroundingTechniquesScreen from './screens/GroundingTechniquesScreen';
import BreathingGuideScreen from './screens/BreathingGuideScreen'; 
import SignOutScreen from './screens/SignOutScreen'; 
import ProfileScreen from './screens/ProfileScreen'; 
import StreakScreen from './screens/StreakScreen';
import SummaryScreen from './screens/SummaryScreen';
import HistoryScreen from './screens/HistoryScreen';
import MoodScreen from './screens/MoodScreen';
import LoginScreen from './screens/LoginScreen'; 
import SignUpScreen from './screens/SignUpScreen'; 
import ClinicsScreen from './screens/ClinicsScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const BottomTabNavigator = ({ navigation }) => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === 'Home') {
          iconName = 'home';
        }else if (route.name === 'Mood'){
          iconName ='calendar-outline';
        }
         else if (route.name === 'Breathing') {
          iconName = 'leaf';
        } else if (route.name === 'Grounding') {
          iconName = 'body';
        } else if (route.name === 'Streak') {
          iconName = 'star'; 
        } else if (route.name === 'Clinics') {
          iconName = 'medkit-outline'; 
        }
        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#ab9e7f',
      tabBarInactiveTintColor: '#d4caa2',
      headerShown: true, 
      headerTintColor: '#ab9e7f',
      headerStyle: { backgroundColor: '#ffffff' },
      headerLeft: () => (
        <Ionicons 
          name="menu" 
          size={24} 
          color="#ab9e7f" 
          style={{ marginLeft: 15 }} 
          onPress={() => navigation.toggleDrawer()} 
        />
      ),
      headerRight: () => (
        <Ionicons 
          name="person" 
          size={24} 
          color="#ab9e7f" 
          style={{ marginRight: 15 }} 
          onPress={() => navigation.navigate('Profile')}
        />
      ),
    })}
  >
    <Tab.Screen name="Home" component={HomeScreen} />
    <Tab.Screen name="Mood" component={MoodScreen} />
    <Tab.Screen name="Breathing" component={BreathingGuideScreen} />
    <Tab.Screen name="Grounding" component={GroundingTechniquesScreen} />
    <Tab.Screen name="Streak" component={StreakScreen} />
    <Tab.Screen name="Clinics" component={ClinicsScreen} />
  </Tab.Navigator>
);

const TabStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Back" 
      component={BottomTabNavigator} 
      options={{ headerShown: false }} 
    />
    <Stack.Screen 
      name="Profile" 
      component={ProfileScreen} 
      options={{
        title: 'Your Profile', 
        headerTintColor: '#ab9e7f', 
        headerStyle: { backgroundColor: '#ffffff' },
      }}  
    />
    <Stack.Screen 
      name="Summary" 
      component={SummaryScreen} 
      options={{ 
        headerShown: true, 
        headerTintColor: '#ab9e7f',
        headerStyle: { backgroundColor: '#ffffff' },
      }} 
    />
    <Stack.Screen 
      name="SignUp" 
      component={SignUpScreen} 
      options={{ 
        headerShown: false, 
        headerTintColor: '#ab9e7f',
        headerStyle: { backgroundColor: '#ffffff' },
      }} 
    />
    <Stack.Screen 
      name="Breathing" 
      component={BreathingGuideScreen} 
      options={{ 
        headerShown: true, 
        headerTintColor: '#ab9e7f',
        headerStyle: { backgroundColor: '#ffffff' },
      }} 
    />
    <Stack.Screen 
      name="Grounding" 
      component={GroundingTechniquesScreen} 
      options={{ 
        headerShown: true, 
        headerTintColor: '#ab9e7f',
        headerStyle: { backgroundColor: '#ffffff' },
      }} 
    />
    <Stack.Screen 
      name="History" 
      component={HistoryScreen} 
      options={{ 
        headerShown: true, 
        headerTintColor: '#ab9e7f',
        headerStyle: { backgroundColor: '#ffffff' },
      }} 
    />
  </Stack.Navigator>
);

const DrawerNavigator = () => (
  <Drawer.Navigator 
    initialRouteName="MainScreen"
    screenOptions={{
      drawerInactiveTintColor: '#d4caa2',
      drawerActiveTintColor: '#ab9e7f',
    }}
  >
    <Drawer.Screen 
      name="MainScreen" 
      component={TabStackNavigator} 
      options={{
        title: 'Home',
        headerShown: false, 
      }}
    />

    <Drawer.Screen 
      name="SignOutScreen" 
      component={SignOutScreen}
      options={{
        title: 'Sign Out',
        headerShown: false, 
      }}
    />
  </Drawer.Navigator>
);

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Drawer" 
          component={DrawerNavigator} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
