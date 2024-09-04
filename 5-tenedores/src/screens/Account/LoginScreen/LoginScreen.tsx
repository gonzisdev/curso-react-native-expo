import { View, ScrollView } from 'react-native'
import { Text, Image } from '@rneui/base'
import { styles } from './LoginScreen.styles'
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
        <Text>Estamos en el login</Text>
        <Text onPress={goToRegister} >Registrarse</Text>
      </View>
    </ScrollView>
  )
}