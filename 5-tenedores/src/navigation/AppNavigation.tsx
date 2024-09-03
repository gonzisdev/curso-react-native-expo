import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { Icon } from "@rneui/base"
import { AccountScreen } from "../screens/AccountScreen"
import { FavoritesScreen } from "../screens/FavoritesScreen"
import { RankingScreen } from "../screens/RankingScreen"
import { RestaurantsScreen } from "../screens/RestaurantsScreen"
import { SearchScreen } from "../screens/SearchScreen"

const Tab = createBottomTabNavigator()

export const AppNavigation = () => {
  return (
    <Tab.Navigator screenOptions={({route}) => ({
        tabBarActiveTintColor: "#00a680",
        tabBarInactiveTintColor: "#646464",
        tabBarIcon: ({color, size}) => screenOptions(route, color, size)
    })}>
        <Tab.Screen name="Restaurant" component={RestaurantsScreen} />
        <Tab.Screen name="Favorites" component={FavoritesScreen} />
        <Tab.Screen name="Ranking" component={RankingScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Account" component={AccountScreen} />
    </Tab.Navigator>
  )
}

const screenOptions = (route: {name: string}, color: string, size: number): React.JSX.Element => {
    let iconName!: string

    if (route.name === 'Restaurant') {
        iconName = "compass-outline"
    }
    if (route.name === 'Favorites') {
        iconName = "heart-outline"
    }
    if (route.name === 'Ranking') {
        iconName = "star-outline"
    }
    if (route.name === 'Search') {
        iconName = "magnify"
    }
    if (route.name === 'Account') {
        iconName = "home-outline"
    }

    return (
        <Icon type="material-community" name={iconName} color={color} size={size} />

    )
}