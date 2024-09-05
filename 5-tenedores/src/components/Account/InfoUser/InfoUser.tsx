import { View } from 'react-native'
import { Avatar, Text } from '@rneui/base'
import { getAuth, User } from 'firebase/auth'
import { styles } from './InfoUser.styles'
import * as ImagePicker from 'expo-image-picker'

export const InfoUser = () => {

    const auth = getAuth();
    const user: User | null = auth.currentUser
  
    const { uid, photoURL, displayName, email } = user || {}

    const changeAvatar = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3]
        })
        if (!result.canceled) {
            const asset = result.assets[0]
            const uri = asset.uri
            uploadImage(uri)
        }
    }

    const uploadImage = (uri: string) => {
        console.log(uri);
        
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