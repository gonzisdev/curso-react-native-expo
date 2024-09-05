import { View } from 'react-native'
import { Button } from '@rneui/base'
import { InfoUser } from '../../../components/Account/InfoUser/InfoUser'
import { styles } from './UserLoggedScreen.styles'
import { getAuth, signOut } from 'firebase/auth'
import { LoadingModal } from '../../../components/Shared/LoadingModal/LoadingModal'
import { useState } from 'react'

export const UserLoggedScreen = () => {

  const [loading, setLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('')

  const logout = async () => {
    const auth = getAuth()
    await signOut(auth)
  }

  return (
    <View>
      <InfoUser 
        setLoading={setLoading} 
        setLoadingText={setLoadingText} 
      />
      <Button 
        title="Cerrar sesión" 
        containerStyle={styles.btnStyles}
        buttonStyle={styles.btn} 
        titleStyle={styles.btnTextStyles} 
        onPress={logout}
      />
      <LoadingModal show={loading} text={loadingText} />
    </View>
  )
}