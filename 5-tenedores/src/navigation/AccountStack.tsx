import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { screen } from "../utils/screenName"
import { AccountScreen } from "../screens/Account/AccountScreen"
import LoginScreen from "../screens/Account/LoginScreen"

const Stack = createNativeStackNavigator()

export const AccountStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={screen.account.account} component={AccountScreen} options={{title: "Cuenta"}} />
            <Stack.Screen name={screen.account.login} component={LoginScreen} options={{title: "Iniciar sesión"}} />
        </Stack.Navigator>
    )
}