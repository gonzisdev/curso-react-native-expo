import { View } from 'react-native'
import { Avatar, Text } from '@rneui/base'
import { getAuth, User } from 'firebase/auth'
import { styles } from './InfoUser.styles'

export const InfoUser = () => {

    const auth = getAuth();
    const user: User | null = auth.currentUser
  
    const { uid, photoURL, displayName, email } = user || {}

    const changeAvatar = () => {

    }

  return (
    <View style={styles.content}>
      <Avatar 
        size="large" 
        rounded 
        icon={{type: "material", name: "person"}}
        containerStyle={styles.avatar}
        source={photoURL ? {uri: photoURL} : undefined}
      >
        <Avatar.Accessory size={24} onPress={changeAvatar} />
      </Avatar>
      <View>
        <Text style={styles.displayName}>{displayName || "Anónimo"}</Text>
        <Text>{email}</Text>
      </View>
    </View>
  )
}