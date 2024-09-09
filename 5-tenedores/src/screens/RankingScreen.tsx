import { useState, useEffect } from 'react'
import { ScrollView, Text } from 'react-native'
import { collection, query, orderBy, onSnapshot, limit, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'
import { db } from '../utils/firebase'
import { RestaurantRanking } from '../components/Restaurants/RestaurantRanking/RestaurantRanking'

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
    <ScrollView>
      {restaurants.map((restaurant, index) => (
        <RestaurantRanking key={index} index={index} restaurant={restaurant.data()}/>
      ))}
    </ScrollView>
  )
}
