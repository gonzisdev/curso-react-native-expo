import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { screen } from "../utils/screenName"
import { SearchScreen } from "../screens/SearchScreen"

const Stack = createNativeStackNavigator()

export const SearchStack = () => {

    return (
        <Stack.Navigator>
            <Stack.Screen name={screen.search.search} component={SearchScreen} options={{title: "Buscador"}} />
        </Stack.Navigator>
    )
}