import { useState, useEffect } from "react"
import { View, Text } from "react-native"
import { UserNotLogged } from "../components/Favorites/UserNotLogged/UserNotLogged"
import { NotFoundRestaurants } from "../components/Favorites/NotFoundRestaurants/NotFoundRestaurants"
import { Loading } from "../components/Shared/Loading/Loading"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { doc, getDoc, collection, query, where, onSnapshot, DocumentData } from "firebase/firestore"
import { db } from "../utils/firebase"

export const FavoritesScreen = () => {

  const [hasLogged, setHasLogged] = useState<boolean | null>(null)
  const [restaurants, setRestaurants] = useState<DocumentData[]>([])
  const auth = getAuth()

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false)
    })
  }, [])

  useEffect(() => {
    if (!auth.currentUser) return;
    const q = query(
      collection(db, "favorites"),
      where("idUser", "==", auth.currentUser.uid)
    )
    onSnapshot(q, async (snapshot) => {
      let restaurantArray = []
      for await (const item of snapshot.docs) {
        const data = item.data()
        const docRef = doc(db, "restaurants", data.idRestaurant)
        const docSnap = await getDoc(docRef)
        const newData = docSnap.data()
        if (newData) {
          newData.idFavorite = data.id
          restaurantArray.push(newData)
        }
      }
      setRestaurants(restaurantArray)
    })
  }, [])

  if (!hasLogged) return <UserNotLogged />
  if (!restaurants) return <Loading show text="Cargando" />
  if (restaurants.length === 0) return <NotFoundRestaurants />

  return (
    <View>
        <Text>FavoritesScreen</Text>
    </View>
  )
}
