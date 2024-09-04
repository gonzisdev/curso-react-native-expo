import { View, Text } from "react-native"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { useEffect, useState } from "react"
import { UserGuestScreen } from "./UserGuestScreen"
import { UserLoggedScreen } from "./UserLoggedScreen"

export const AccountScreen = () => {

  const [hasLogged, setHasLogged] = useState(false)

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth, (user) => {
      setHasLogged(user ? true : false)
    })
  }, [])

  return hasLogged ? <UserLoggedScreen /> : <UserGuestScreen />
}
