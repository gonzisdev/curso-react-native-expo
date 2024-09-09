import { View, TouchableOpacity } from 'react-native'
import { Image, Icon, Text } from '@rneui/base'
import { DocumentData } from 'firebase/firestore'
import { styles } from './RestaurantFavorite.styles'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../../utils/screenName'
import { doc, deleteDoc } from 'firebase/firestore'
import { db } from '../../../utils/firebase'


type RestaurantFavoriteProps = {
    restaurant: DocumentData // No hacer esto, tipar restaurant correctamente de manera global
}

export const RestaurantFavorite = ({restaurant}: RestaurantFavoriteProps) => {

    const navigation = useNavigation()

    const goToRestaurant = () => {
        navigation.navigate(screen.restaurant.tab, {
            screen: screen.restaurant.restaurant,
            params: {
                id: restaurant.id
            } // No hacer esto xD, tipar correctamente
        })
    }

    const onRemoveFavorite = async () => {
        try {
            await deleteDoc(doc(db, "favorites", restaurant.idFavorite))
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <TouchableOpacity onPress={goToRestaurant}>
      <View style={styles.content}>
        <Image source={{uri: restaurant.images[0]}} style={styles.image} />
        <View style={styles.infoContent}>
            <Text style={styles.name}>
                {restaurant.name}
            </Text>
            <Icon type='material-community' name='heart' color="#f00" size={35} containerStyle={styles.iconContainer} onPress={onRemoveFavorite} />
        </View>
      </View>
    </TouchableOpacity>
  )
}