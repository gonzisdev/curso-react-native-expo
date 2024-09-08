import { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Text, Button } from '@rneui/base'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { useNavigation } from '@react-navigation/native'
import { styles } from './BtnReviewForm.styles'
import { screen } from '../../../utils/screenName'

type BtnReviewFormProps = {
    idRestaurant: string // Mejor crear tipo de Restaurant de manera global y hacer look up
}

export const BtnReviewForm = ({idRestaurant}: BtnReviewFormProps) => {

    const [hasLogged, setHasLogged] = useState(false)
    const auth = getAuth()
    const navigation = useNavigation()

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            setHasLogged(user ? true : false)
        })
    }, [])

    const goToLogin = () => {
        navigation.navigate(screen.account.tab, {
            screen: screen.account.login
        }) // No hacer esto xD Tipar correctamente
    }

    const goToAddReview = () => {
        navigation.navigate(screen.restaurant.addReviewRestaurant, {
            idRestaurant
        }) // No hacer esto xD Tipar correctamente
    }

  return (
    <View style={styles.content}>
      {hasLogged ? (
        <Button 
            title="Escribe una opinión" 
            icon={{type: "material-community", name: "square-edit-outline", color: "#00a680"}} 
            buttonStyle={styles.button}
            titleStyle={styles.btnText}
            onPress={goToAddReview}
        />
      ) : (
        <Text 
            style={styles.text} 
            onPress={goToLogin}
        >Para escribir una opinión es necesario estar logeado, {""}
            <Text style={styles.textClick}>pulsa AQUÍ para iniciar sesión</Text>
        </Text>
      )}
    </View>
  )
}