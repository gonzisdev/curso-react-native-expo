import { View, Text } from 'react-native'
import { styles } from './AddReviewRestaurantScreen.styles'

type AddReviewRestaurantScreenProps = { // No hacer esto xD Tipar correctamente
    route: {
        params: {
            idRestaurant: string
        }
    }
}

export const AddReviewRestaurantScreen = ({route}: AddReviewRestaurantScreenProps) => {
  return (
    <View>
      <Text>AddReviewRestaurantScreen</Text>
    </View>
  )
}