import { View } from 'react-native'
import { AirbnbRating, Input, Button } from '@rneui/themed'
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
    <View style={styles.content}>
      <View>
        <View style={styles.ratingContent}>
            <AirbnbRating 
                count={5} 
                reviews={["Pésimo", "Deficiente", "Normal", "Muy bueno", "Excelente"]} 
                defaultRating={0}
                size={35}
                onFinishRating={(rating) => console.log(rating)}
            />
        </View>
        <View>
            <Input placeholder='Título' />
            <Input placeholder='Comentario' multiline inputContainerStyle={styles.comment} />
        </View>
      </View>
      <Button title="Enviar review" containerStyle={styles.btnContainer} buttonStyle={styles.btn} />
    </View>
  )
}