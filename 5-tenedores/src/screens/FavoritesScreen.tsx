import { useState, useEffect } from "react"
import { View, Text } from "react-native"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import UserNotLogged from "../components/Favorites/UserNotLogged/UserNotLogged"

export const FavoritesScreen = () => {

  const [hasLogged, setHasLogged] = useState<boolean | null>(null)
  const auth = getAuth()

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false)
    })
  }, [])

  if (!hasLogged) return <UserNotLogged />

  return (
    <View>
        <Text>FavoritesScreen</Text>
    </View>
  )
}
