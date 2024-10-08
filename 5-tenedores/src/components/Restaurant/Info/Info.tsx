import { View } from 'react-native'
import { Text, ListItem, Icon } from '@rneui/base'
import { Map } from '../../Shared/Map/Map'
import { styles } from './Info.styles'

type InfoProps = { // Crear tipo para restaurante, no hacerlo así
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

export const Info = ({restaurant}: InfoProps) => {

    const listInfo = [
        {
            text: restaurant.address,
            iconType: "material-community",
            iconName: "map-marker"
        },
        {
            text: restaurant.phone,
            iconType: "material-community",
            iconName: "phone"
        },
        {
            text: restaurant.email,
            iconType: "material-community",
            iconName: "at"
        }
    ]

  return (
    <View style={styles.content}>
      <Text style={styles.title}>Información sobre el restaurante</Text>
      <Map location={restaurant.location} name={restaurant.name} />
      {listInfo.map((item, index) => (
        <ListItem key={index} bottomDivider>
            <Icon type={item.iconType} name={item.iconName} color="#00a680" />
            <ListItem.Content>
                <ListItem.Title>{item.text}</ListItem.Title>
            </ListItem.Content>
        </ListItem>
      ))}
    </View>
  )
}