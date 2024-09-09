import { View } from 'react-native'
import { styles } from './NotFoundRestaurants.styles'
import { Icon, Text } from '@rneui/base'

export const NotFoundRestaurants = () => {
  return (
    <View style={styles.content}>
      <Icon type='material-community' name='alert-outline' size={80} />
      <Text style={styles.text}>No tienes restaurantes en tu lista</Text>
    </View>
  )
}