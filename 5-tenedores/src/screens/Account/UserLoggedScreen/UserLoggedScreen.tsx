import { View } from 'react-native'
import { Button } from '@rneui/base'
import { InfoUser } from '../../../components/Account/InfoUser/InfoUser'
import { styles } from './UserLoggedScreen.styles'
import { getAuth, signOut } from 'firebase/auth'
import { LoadingModal } from '../../../components/Shared/LoadingModal/LoadingModal'
import { useState } from 'react'
import { AccountOptions } from '../../../components/Account/AccountOptions'

export const UserLoggedScreen = () => {

  const [loading, setLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('')
  const [_, setReload] = useState(false)

  const onReload = () => setReload(prevState => !prevState)

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
      <AccountOptions 
        onReload={onReload}
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