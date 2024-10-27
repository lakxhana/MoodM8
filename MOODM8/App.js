
  import React from 'react';
  import { NavigationContainer } from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import HomeScreen from './screens/HomeScreen';
  import GroundingTechniquesScreen from './screens/GroundingTechniquesScreen';
  import BreathingGuideScreen from './screens/BreathingGuideScreen'; 
  import ProfileScreen from './screens/ProfileScreen'; 
  import Ionicons from 'react-native-vector-icons/Ionicons'; 
  import { createDrawerNavigator } from '@react-navigation/drawer';

  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();

  // Drawer Navigator
  const DrawerNavigator = ({ navigation }) => (
    <Drawer.Navigator initialRouteName="Home"
    screenOptions={{drawerInactiveTintColor: '#d4caa2',drawerActiveTintColor:'#ab9e7f' ,headerTintColor:'#ab9e7f'}}>
    
      <Drawer.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          headerRight: () => (
            <Ionicons 
              name="person" 
              size={24} 
              color="#ab9e7f" 
              style={{ marginRight: 15 }} 
              onPress={() => navigation.navigate('Profile')}
            />
          ),
        }} 
      />
      <Drawer.Screen name="BreathingGuide" component={BreathingGuideScreen} />
      <Drawer.Screen name="GroundingTechniques" component={GroundingTechniquesScreen}/>
    </Drawer.Navigator>
  );

  // Main App Component
  export default function App() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen 
            name="-" 
            component={DrawerNavigator} 
            options={{ headerShown: false }} 
          />
          <Stack.Screen name="Profile" component={ProfileScreen} options={{
              title: 'Your Profile', 
              headerTintColor: '#ab9e7f', 
              headerStyle: {
                backgroundColor: '#ffffff', 
              },
            }}  />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
