import { View, Text } from "react-native"
import { Button } from "@rneui/base"
import { screen } from "../../utils/screenName"

type RestaurantsScreenProps = {  // No hacer esto xD Tipar correctamente
  navigation: {
    navigate: (routeName: string) => void
  }
}

export const RestaurantsScreen = ({navigation}: RestaurantsScreenProps) => {
  
  const goToAddRestaurant = () => {
    navigation.navigate(screen.restaurant.addRestaurant)
  }

  return (
    <View>
        <Text>Estamos en la screen Restaurants</Text>
        <Button title="Crear restaurante" onPress={goToAddRestaurant} />
    </View>
  )
}
