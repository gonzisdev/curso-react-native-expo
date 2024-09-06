import { ScrollView } from 'react-native'
import { Button } from '@rneui/base'
import { InfoForm } from '../../../components/Restaurants/AddRestaurant/InfoForm/InfoForm'
import { UploadImageForm } from '../../../components/Restaurants/AddRestaurant/UploadImageForm/UploadImageForm'
import { useFormik } from 'formik'
import { styles } from './AddRestaurantScreen.styles'
import { initialValues, validationSchema } from './AddRestaurantScreen.data'
import { ImageRestaurant } from '../../../components/Restaurants/AddRestaurant/ImageRestaurant/ImageRestaurant'

export const AddRestaurantScreen = () => {

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
    <ScrollView showsVerticalScrollIndicator={false}>
      <ImageRestaurant 
        formik={formik}
      />
      <InfoForm
        formik={formik}
      />
      <UploadImageForm
        formik={formik}
      />
      <Button 
        title="Crear restaurante"
        buttonStyle={styles.addRestaurant} 
        onPress={handleSubmit}
        loading={formik.isSubmitting}
      />
    </ScrollView>
  )
}