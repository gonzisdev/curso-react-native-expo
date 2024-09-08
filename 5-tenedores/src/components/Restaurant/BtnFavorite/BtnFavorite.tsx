import { View } from 'react-native'
import { Icon } from '@rneui/base'
import { getAuth } from 'firebase/auth'
import { doc, getDocs, setDoc, query, where, collection, deleteDoc } from 'firebase/firestore'
import { db } from '../../../utils/firebase'
import { v4 as uuid } from 'uuid'
import { styles } from './BtnFavorite.styles'

type BtnFavoriteProps = {
    idRestaurant: string // Mejor crear tipo de Restaurant de manera global y hacer look up
}

export const BtnFavorite = ({idRestaurant}: BtnFavoriteProps) => {

    const auth = getAuth()
    const addFavorite = async () => {
        try {
            const idFavorite = uuid()
            const data = {
                id: idFavorite,
                idRestaurant,
                idUser: auth.currentUser?.uid
            }
            await setDoc(doc(db, "favorites", idFavorite), data)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <View style={styles.content}>
      <Icon type='material-community' name='heart-outline' color="#000" size={35} onPress={addFavorite} />
    </View>
  )
}