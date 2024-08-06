import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {ROUTES} from 'constants/routes';
import {RecentlyBoughtScreen} from 'screens/recently-bought';
import {GroceriesScreen} from 'screens/groceries';

type MainStackParamList = {
  [ROUTES.GROCERIES]: undefined;
  [ROUTES.RECENTLY_BOUGHT]: undefined;
};

const Tab = createBottomTabNavigator<MainStackParamList>();

export const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontSize: 16,
          fontFamily: 'Poppins-Regular',
        },
      }}>
      <Tab.Screen
        name={ROUTES.GROCERIES}
        options={{
          tabBarLabel: 'Groceries',
        }}
        component={GroceriesScreen}
      />
      <Tab.Screen
        name={ROUTES.RECENTLY_BOUGHT}
        options={{
          tabBarLabel: 'Recently Bought',
        }}
        component={RecentlyBoughtScreen}
      />
    </Tab.Navigator>
  );
};
