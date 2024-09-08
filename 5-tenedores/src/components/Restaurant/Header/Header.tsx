import { View } from 'react-native'
import { Text, Rating } from '@rneui/base'
import { styles } from './Header.styles'

type HeaderProps = { // Crear tipo para restaurante, no hacerlo así
    restaurant: {
        id: string
        name: string
        address: string
        phone: string
        email: string
        description: string
        location: {
          latitude: number
          longitude: number
          latitudeDelta: number
          longitudeDelta: number
        }
        images: never[]
        createdAt: Date
        ratingMedia: number
    }
}

export const Header = ({restaurant}: HeaderProps) => {
  return (
    <View style={styles.content}>
      <View style={styles.titleView}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Rating imageSize={20} readonly startingValue={restaurant.ratingMedia | 0} />
      </View>
      <Text style={styles.description}>{restaurant.description}</Text>
    </View>
  )
}