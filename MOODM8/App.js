import StreakScreen from './screens/StreakScreen';
import SummaryScreen from './screens/SummaryScreen';
import HistoryScreen from './screens/HistoryScreen';

//drawer
<Drawer.Screen name="Another" component={AnotherScreen} />
<Drawer.Screen name="Streak" component={StreakScreen} />

//main component
<Stack.Screen name="Streak Button"
component={StreakScreen}/>

{/* Add the SummaryScreen here */}
<Stack.Screen 
    name="Summary" 
    component={SummaryScreen} 
    options={{ 
    headerShown: true, 
    headerTintColor: '#ab9e7f', // Match the color used in StreakScreen
    headerStyle: {
    backgroundColor: '#ffffff', // You can also match the background color if needed
            },
        }} 
/>
          
{/* Add the HistoryScreen here */}
    <Stack.Screen 
        name="History" 
        component={HistoryScreen} 
        options={{ 
            headerShown: true, 
            headerTintColor: '#ab9e7f', // Match the color used in StreakScreen
            headerStyle: {
            backgroundColor: '#ffffff', // You can also match the background color if needed
            },
        }} 
    />