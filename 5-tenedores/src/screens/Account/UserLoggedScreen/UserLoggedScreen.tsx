import { View } from 'react-native'
import { Button } from '@rneui/base'
import { InfoUser } from '../../../components/Account/InfoUser/InfoUser'
import { styles } from './UserLoggedScreen.styles'
import { getAuth, signOut } from 'firebase/auth'

export const UserLoggedScreen = () => {

  const logout = async () => {
    const auth = getAuth()
    await signOut(auth)
  }

  return (
    <View>
      <InfoUser />
      <Button 
        title="Cerrar sesión" 
        containerStyle={styles.btnStyles}
        buttonStyle={styles.btn} 
        titleStyle={styles.btnTextStyles} 
        onPress={logout}
      />
    </View>
  )
}