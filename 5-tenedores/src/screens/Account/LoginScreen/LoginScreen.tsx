import { View, ScrollView } from 'react-native'
import { Text, Image } from '@rneui/base'
import { styles } from './LoginScreen.styles'
import { LoginForm } from '../../../components/Auth/LoginForm/LoginForm'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../../../utils/screenName'

export const LoginScreen = () => {

  const navigation = useNavigation()

  const goToRegister = () => {
    navigation.navigate(screen.account.register as never) // No hacer esto xD Tipar correctamente
  }

  return (
    <ScrollView>
      <Image source={require("../../../../assets/img/5-tenedores-letras-icono-logo.png")} style={styles.image} />
      <View style={styles.content}>
        <LoginForm />
        <Text style={styles.textRegister} >
          ¿Aún no tienes cuenta? <Text style={styles.btnRegister} onPress={goToRegister}>Registrarse</Text>
        </Text>
      </View>
    </ScrollView>
  )
}