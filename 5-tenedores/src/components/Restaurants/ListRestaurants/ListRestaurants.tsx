import { View, FlatList, TouchableOpacity } from 'react-native'
import { Text, Image } from '@rneui/base'
import { DocumentData, QueryDocumentSnapshot } from 'firebase/firestore'
import { styles } from './ListRestaurants.styles'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../../utils/screenName'

type ListRestaurantsProps = {
    restaurants: QueryDocumentSnapshot<DocumentData, DocumentData>[]
}

export const ListRestaurants = ({restaurants}: ListRestaurantsProps) => {

    const navigation = useNavigation()

    const goToRestaurant = (restaurant: DocumentData) => {
        navigation.navigate(screen.restaurant.restaurant, {id: restaurant.id}) // No hacer esto xD Tipar correctamente
    }

  return (
      <FlatList 
        data={restaurants}
        renderItem={(doc) => {
            const restaurant = doc.item.data()
            
            return (
                <TouchableOpacity onPress={() => goToRestaurant(restaurant)}>
                    <View style={styles.restaurant}>
                        <Image source={{uri: restaurant.images[0]}} style={styles.image} />
                        <View>
                            <Text style={styles.name}>{restaurant.name}</Text>
                            <Text style={styles.info}>{restaurant.address}</Text>
                            <Text style={styles.info}>{restaurant.description}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            )
        }}
      />
  )
}