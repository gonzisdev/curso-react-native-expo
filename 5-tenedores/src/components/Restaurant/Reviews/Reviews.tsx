import { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { doc, onSnapshot, collection, query, where, orderBy, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'
import { db } from '../../../utils/firebase'
import { styles } from './Reviews.styles'

type ReviewsProps = {
    idRestaurant: string // Mejor crear tipo de Restaurant de manera global y hacer look up
}

export default function Reviews({idRestaurant}: ReviewsProps) {

    const [reviews, setReviews] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>([])

    useEffect(() => {
        const q = query(
            collection(db, "reviews"),
            where("idRestaurant", "==", idRestaurant),
            orderBy("createdAt", "desc")
        )
        onSnapshot(q, (snapshot) => {
            setReviews(snapshot.docs)
        })
    }, [])

  return (
    <View>
      <Text>Reviews</Text>
    </View>
  )
}