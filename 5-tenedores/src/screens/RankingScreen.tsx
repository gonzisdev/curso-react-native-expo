import { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import { collection, query, orderBy, onSnapshot, limit, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'
import { db } from '../utils/firebase'

export const RankingScreen = () => {

  const [restaurants, setRestaurants] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>([])

  useEffect(() => {
    const q = query(
      collection(db, "restaurants"),
      orderBy("ratingMedia", "desc"),
      limit(10)
    )
    onSnapshot(q, (snapshot) => {
      setRestaurants(snapshot.docs)
    })
  }, [])

  return (
    <View>
      <Text>RankingScreen</Text>
    </View>
  )
}
