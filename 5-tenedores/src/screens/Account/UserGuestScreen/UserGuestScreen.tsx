import { ScrollView } from 'react-native'
import { Text, Button, Image } from '@rneui/base'
import { styles } from './UserGuestScreen.styles'
import { screen } from '../../../utils/screenName'
import { useNavigation } from '@react-navigation/native'

export const UserGuestScreen = () => {

  const navigation = useNavigation()

  const goToLogin = () => {
    navigation.navigate(screen.account.login as never) // No hacer esto xD Tipar correctamente
  }

  return (
    <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: "center"}} style={styles.content}>
      <Image source={require("../../../../assets/img/user-guest.png")} style={styles.image} />
      <Text style={styles.text}>Consultar tu perfil de 5 Tenedores</Text>
      <Text style={styles.description}>
        ¿Cómo describirías tu mejor restaurante? Busca y visualiza los mejores 
        restaurantes de una forma sencilla, vota cúal te ha gustado más y 
        comenta cómo ha sido tu experiencia.
      </Text>
      <Button title="Ver tu perfil" onPress={goToLogin} buttonStyle={styles.btnStyle} />
    </ScrollView>
  )
}