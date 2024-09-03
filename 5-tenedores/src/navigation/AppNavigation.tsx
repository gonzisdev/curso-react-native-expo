import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { AccountScreen } from "../screens/AccountScreen"
import { FavoritesScreen } from "../screens/FavoritesScreen"
import { RankingScreen } from "../screens/RankingScreen"
import { RestaurantsScreen } from "../screens/RestaurantsScreen"
import { SearchScreen } from "../screens/SearchScreen"

const Tab = createBottomTabNavigator()

export const AppNavigation = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Restaurant" component={RestaurantsScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
        <Tab.Screen name="Ranking" component={RankingScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  )
}