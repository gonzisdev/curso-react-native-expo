import { View, Text } from 'react-native'
import { Icon } from '@rneui/base'
import { styles } from './BtnFavorite.styles'

type BtnFavoriteProps = {
    idRestaurant: string // Mejor crear tipo de Restaurant de manera global y hacer look up
}

export const BtnFavorite = ({idRestaurant}) => {

    const addFavorite = () => {

    }

  return (
    <View style={styles.content}>
      <Icon type='material-community' name='heart-outline' color="#000" size={35} onPress={addFavorite} />
    </View>
  )
}