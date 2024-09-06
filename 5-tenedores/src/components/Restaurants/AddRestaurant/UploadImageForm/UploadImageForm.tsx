import { View, Alert } from 'react-native'
import { FormikProps } from 'formik'
import { Icon, Avatar, Text } from '@rneui/base'
import * as ImagePicker from "expo-image-picker"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 as uuid} from "uuid"
import { styles } from './UploadImageForm.styles'

type UploadImageFormProps = {
    formik: FormikProps<any>
}

export const UploadImageForm = ({formik}: UploadImageFormProps) => {

    const openGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        })
        if (!result.canceled) {
            const asset = result.assets[0]
            const uri = asset.uri
            uploadImage(uri)
        }
    }

    const uploadImage = async (uri: string) => {
        const response = await fetch(uri)
        const blob = await response.blob()

        const storage = getStorage()
        const storageRef = ref(storage, `restaurants/${uuid()}`)
        uploadBytes(storageRef, blob).then((snapshot) => {

        })
    }

  return (
    <>
      <View style={styles.viewImage}>
        <Icon 
            type='material-community' 
            name='camera' 
            color="#a7a7a7" 
            containerStyle={styles.containerIcon} 
            onPress={openGallery}/>
      </View>
    </>
  )
}