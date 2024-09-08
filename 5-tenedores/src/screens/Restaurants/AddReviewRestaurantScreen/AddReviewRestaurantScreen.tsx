import { View } from 'react-native'
import { AirbnbRating, Input, Button } from '@rneui/themed'
import { useFormik } from 'formik'
import { styles } from './AddReviewRestaurantScreen.styles'
import { initialValues, validationSchema } from './AddReviewRestaurantScreen.data'

type AddReviewRestaurantScreenProps = { // No hacer esto xD Tipar correctamente
    route: {
        params: {
            idRestaurant: string
        }
    }
}

export const AddReviewRestaurantScreen = ({route}: AddReviewRestaurantScreenProps) => {

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {

        }
    })

    const handleSubmit = () => {
        formik.handleSubmit()
    }

  return (
    <View style={styles.content}>
      <View>
        <View style={styles.ratingContent}>
            <AirbnbRating 
                count={5} 
                reviews={["Pésimo", "Deficiente", "Normal", "Muy bueno", "Excelente"]} 
                defaultRating={formik.values.rating}
                size={35}
                onFinishRating={(rating) => formik.setFieldValue("rating", rating)}
            />
        </View>
        <View>
            <Input 
                placeholder='Título' 
                onChangeText={(text) => formik.setFieldValue("title", text)} 
                errorMessage={formik.errors.title}
            />
            <Input 
                placeholder='Comentario' 
                multiline 
                inputContainerStyle={styles.comment} 
                onChangeText={(text) => formik.setFieldValue("comment", text)} 
                errorMessage={formik.errors.comment}
            />
        </View>
      </View>
      <Button 
        title="Enviar review" 
        containerStyle={styles.btnContainer} 
        buttonStyle={styles.btn} 
        onPress={handleSubmit}
        loading={formik.isSubmitting}
      />
    </View>
  )
}