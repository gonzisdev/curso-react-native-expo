import { View } from 'react-native'
import { AirbnbRating, Input, Button } from '@rneui/themed'
import { useFormik } from 'formik'
import { initialValues, validationSchema } from './AddReviewRestaurantScreen.data'
import { getAuth } from 'firebase/auth'
import { doc, setDoc, query, collection, where, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../../../utils/firebase'
import { v4 as uuid } from 'uuid'
import Toast from 'react-native-toast-message'
import { styles } from './AddReviewRestaurantScreen.styles'
import { useNavigation } from '@react-navigation/native'

type AddReviewRestaurantScreenProps = { // No hacer esto xD Tipar correctamente
    route: {
        params: {
            idRestaurant: string
        }
    }
}

export const AddReviewRestaurantScreen = ({route}: AddReviewRestaurantScreenProps) => {

    const navigation = useNavigation()

    const formik = useFormik({
        initialValues: initialValues(),
        validationSchema: validationSchema(),
        validateOnChange: false,
        onSubmit: async (formValue) => {
            try {
                const auth = getAuth()
                const idDoc = uuid()
                const newData = {
                    ...formValue, 
                    id: idDoc, 
                    idRestaurant: route.params.idRestaurant, 
                    idUser: auth.currentUser?.uid, 
                    avatar: auth.currentUser?.photoURL,
                    createdAt: new Date()
                }
                await setDoc(doc(db, "reviews", idDoc), newData)
                await updateRestaurant()
            } catch (error) {
                Toast.show({
                    type: "error",
                    position: "bottom",
                    text1: "Error al enviar la review"
                })
            }
        }
    })

    const updateRestaurant = async () => {
        const q = query(
            collection(db, "reviews"),
            where("idRestaurant", "==", route.params.idRestaurant)
        )
        onSnapshot(q, async (snapshot) => {
            const reviews = snapshot.docs
            const arrayStars = reviews.map(review => {
                return review.data().rating
            })
            const sumStars = arrayStars.reduce((acc, rating) => acc + rating, 0)
            const media = sumStars / arrayStars.length
            const restaurantRef = doc(db, "restaurants", route.params.idRestaurant)
            await updateDoc(restaurantRef, {
                ratingMedia: media
            })
            navigation.goBack()
        })
    }

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