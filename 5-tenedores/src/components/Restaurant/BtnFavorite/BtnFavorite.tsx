import { useState, useEffect } from 'react'
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

    const [isFavorite, setIsFavorite] = useState(false)
    const [isReaload, setIsReload] = useState(false)

    useEffect(() => {
        (async () => {
            const response = await getFavorites()
            if (response.length > 0) {
                setIsFavorite(true)
            } else {
                setIsFavorite(false)
            }
        })()
    }, [idRestaurant, isReaload])

    const onReload = () => setIsReload(prevState => !prevState)

    const getFavorites = async () => {
        const q = query(
            collection(db, "favorites"),
            where("idRestaurant", "==", idRestaurant),
            where("idUser", "==", auth.currentUser?.uid)
        )
        const result = await getDocs(q)
        return result.docs
    }

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
            onReload()
        } catch (error) {
            console.log(error)
        }
    }

    const removeFavorite = () => {

    }

  return (
    <View style={styles.content}>
      <Icon type='material-community' name={isFavorite ? 'heart' : 'heart-outline'} color={isFavorite ? '#f00' : '#000'} size={35} onPress={isFavorite ? removeFavorite : addFavorite} />
    </View>
  )
}