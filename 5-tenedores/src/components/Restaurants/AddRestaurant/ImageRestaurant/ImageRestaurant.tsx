import { View } from 'react-native'
import { Image } from '@rneui/base'
import { FormikProps } from 'formik'
import { styles } from './ImageRestaurant.styles'

type ImageRestaurantProps = {
    formik: FormikProps<any>
}

export const ImageRestaurant = ({formik}: ImageRestaurantProps) => {

    const primaryImage = formik.values.images[0]

  return (
    <View style={styles.content}>
      <Image 
        source={primaryImage ? {uri: primaryImage} : require("../../../../../assets/img/not-found.png")}
        style={styles.image}
      />
    </View>
  )
}