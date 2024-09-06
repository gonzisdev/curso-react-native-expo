import { ScrollView } from 'react-native'
import { Button } from '@rneui/base'
import { InfoForm } from '../../../components/Restaurants/AddRestaurant/InfoForm/InfoForm'
import { UploadImageForm } from '../../../components/Restaurants/AddRestaurant/UploadImageForm/UploadImageForm'
import { useFormik } from 'formik'
import { v4 as uuid } from 'uuid'
import { doc, setDoc} from "firebase/firestore"
import { styles } from './AddRestaurantScreen.styles'
import { initialValues, validationSchema } from './AddRestaurantScreen.data'
import { ImageRestaurant } from '../../../components/Restaurants/AddRestaurant/ImageRestaurant/ImageRestaurant'
import { db } from '../../../utils/firebase'
import { useNavigation } from '@react-navigation/native'

type newDataType = {
  id: string
  name: string
  address: string
  phone: string
  email: string
  description: string
  location: null
  images: never[]
  createdAt: Date
}

export const AddRestaurantScreen = () => {

  const navigation = useNavigation()

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        const newData: newDataType = {
          ...formValue, 
          id: uuid(), 
          createdAt: new Date()
        }
        await setDoc(doc(db, "restaurants", newData.id), newData)
        navigation.goBack()
      } catch (error) {
        console.log(error)
      }
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