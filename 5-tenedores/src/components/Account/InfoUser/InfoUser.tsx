import { View } from 'react-native'
import { Avatar, Text } from '@rneui/base'
import { getAuth, User, updateProfile } from 'firebase/auth'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import * as ImagePicker from 'expo-image-picker'
import { styles } from './InfoUser.styles'
import { useState } from 'react'

type InfoUserProps = {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setLoadingText: React.Dispatch<React.SetStateAction<string>>
}

export const InfoUser = ({setLoading, setLoadingText}: InfoUserProps) => {

    const auth = getAuth();
    const user: User | null = auth.currentUser
  
    const { uid, photoURL, displayName, email } = user || {}

    const [avatar, setAvatar] = useState(photoURL)

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

    const uploadImage = async (uri: string) => {
        setLoadingText('Actualizando avatar')
        setLoading(true)
        const response = await fetch(uri)
        const blob = await response.blob()

        const storage = getStorage()
        const storageRef = ref(storage, `avatar/${uid}`)
        uploadBytes(storageRef, blob).then((snapshot) => {
            updatePhotoUrl(snapshot.metadata.fullPath)
        })
    }

    const updatePhotoUrl = async (imagePath: string) => {
        const storage = getStorage()
        const imageRef = ref(storage, imagePath)
        const imageUrl = await getDownloadURL(imageRef)
        const auth = getAuth();
        if (auth.currentUser) {
            updateProfile(auth.currentUser, {photoURL: imageUrl})
        }
        setAvatar(imageUrl)
        setLoading(false)
    }

  return (
    <View style={styles.content}>
      <Avatar 
        size="large" 
        rounded 
        icon={!avatar ? {type: "material", name: "person"} : undefined}
        containerStyle={styles.avatar}
        source={avatar ? {uri: avatar} : undefined}
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