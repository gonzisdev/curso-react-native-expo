import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { screen } from "../utils/screenName"
import { RestaurantsScreen } from "../screens/Restaurants/RestaurantsScreen/RestaurantsScreen"
import { AddRestaurantScreen } from "../screens/Restaurants/AddRestaurantScreen/AddRestaurantScreen"

const Stack = createNativeStackNavigator()

export const RestaurantStack = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name={screen.restaurant.restaurants} component={RestaurantsScreen} options={{title: "Restaurantes"}} />
            <Stack.Screen name={screen.restaurant.addRestaurant} component={AddRestaurantScreen} options={{title: "Nuevo restaurante"}} />
        </Stack.Navigator>
    )
}