import { View, TouchableOpacity } from 'react-native'
import { Image, Text, Rating, Icon } from '@rneui/base'
import { DocumentData } from 'firebase/firestore'
import { styles } from './RestaurantRanking.styles'

type RestaurantRankingProps = {
    index: number
    restaurant: DocumentData
}

export const RestaurantRanking = ({index, restaurant}: RestaurantRankingProps) => {

    const renderMedal = () => {
        if (index > 2) return null

        let color = ""
        if (index === 0) color = "#ffd700"
        if (index === 1) color = "#bebebe"
        if (index === 2) color = "#cd7f32"

        return (
            <Icon type='material-community' name='medal-outline' color={color} containerStyle={styles.medal} />
        )
    }

  return (
    <TouchableOpacity onPress={() => {}}>
      <View style={styles.content}>
        <Image source={{uri: restaurant.images[0]}} style={styles.image} />
        <View style={styles.infoContent}>
            <View style={styles.nameContent}>
                {renderMedal()}
                <Text style={styles.name}>{restaurant.name}</Text>
            </View>
            <Rating imageSize={15} readonly startingValue={restaurant.ratingMedia} />
        </View>
        <Text style={styles.description}>{restaurant.description}</Text>
      </View>
    </TouchableOpacity>
  )
}