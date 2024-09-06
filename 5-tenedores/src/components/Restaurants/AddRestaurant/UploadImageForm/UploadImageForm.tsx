import { useState } from 'react'
import { ScrollView, Alert } from 'react-native'
import { FormikProps } from 'formik'
import { Icon, Avatar, Text } from '@rneui/base'
import * as ImagePicker from "expo-image-picker"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage"
import { v4 as uuid} from "uuid"
import { LoadingModal } from '../../../Shared/LoadingModal/LoadingModal'
import { styles } from './UploadImageForm.styles'

type UploadImageFormProps = {
    formik: FormikProps<any>
}

export const UploadImageForm = ({formik}: UploadImageFormProps) => {

    const [loading, setLoading] = useState(false)

    const openGallery = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4,3],
            quality: 1
        })
        if (!result.canceled) {
            setLoading(true)
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
            updatePhotosRestaurant(snapshot.metadata.fullPath)
        })
    }

    const updatePhotosRestaurant = async (imagePath: string) => {
        const storage = getStorage()
        const imageRef = ref(storage, imagePath)
        const imageUrl = await getDownloadURL(imageRef)
        formik.setFieldValue("images", [...formik.values.images, imageUrl])
        setLoading(false)
    }

  return (
    <>
      <ScrollView style={styles.viewImage} horizontal showsHorizontalScrollIndicator={false}>
        <Icon 
            type='material-community' 
            name='camera' 
            color="#a7a7a7" 
            containerStyle={styles.containerIcon} 
            onPress={openGallery}
        />
        {formik.values.images.map((image: string) => (
            <Avatar
                key={image}
                source={{uri: image}}
                containerStyle={styles.imageStyle}
            />
        ))}
      </ScrollView>
      <Text style={styles.error}>{formik.errors.images?.toString()}</Text>
      <LoadingModal show={loading} text='Subiendo imagen' />
    </>
  )
}