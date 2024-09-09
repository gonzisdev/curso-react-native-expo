import { View, TouchableOpacity } from 'react-native'
import { Image, Text, Rating, Icon } from '@rneui/base'
import { DocumentData } from 'firebase/firestore'
import { styles } from './RestaurantRanking.styles'

type RestaurantRankingProps = {
    index: number
    restaurant: DocumentData
}

export const RestaurantRanking = ({index, restaurant}: RestaurantRankingProps) => {
  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.content}>
        <Image source={{uri: restaurant.images[0]}} style={styles.image} />
        <View style={styles.infoContent}>
            <Text style={styles.name}>{restaurant.name}</Text>
            <Rating imageSize={15} readonly startingValue={restaurant.ratingMedia} />
        </View>
        <Text style={styles.description}>{restaurant.description}</Text>
      </View>
    </TouchableOpacity>
  )
}