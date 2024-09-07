import { useEffect, useState } from "react"
import { View, Text } from "react-native"
import { Icon } from "@rneui/base"
import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import { collection, DocumentData, onSnapshot, orderBy, query, QueryDocumentSnapshot } from "firebase/firestore"
import { db } from "../../../utils/firebase"
import { screen } from "../../../utils/screenName"
import { styles } from "./RestaurantsScreen.styles"

type RestaurantsScreenProps = {  // No hacer esto xD Tipar correctamente
  navigation: {
    navigate: (routeName: string) => void
  }
}

export const RestaurantsScreen = ({navigation}: RestaurantsScreenProps) => {

  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [restaurants, setResturants] = useState<QueryDocumentSnapshot<DocumentData>[]>([])

  useEffect(() => {
    const auth = getAuth()
    onAuthStateChanged(auth , (user) => {
      setCurrentUser(user)
    })
  }, [])

  useEffect(() => {
    const q = query(
      collection(db, "restaurants"),
      orderBy("createdAt", "desc")
    )
    onSnapshot(q, (snapshot) => {
      setResturants(snapshot.docs)
    })
  }, [])
  
  const goToAddRestaurant = () => {
    navigation.navigate(screen.restaurant.addRestaurant)
  }

  return (
    <View style={styles.content}>
        <Text>Estamos en la screen Restaurants</Text>
        {currentUser && (
          <Icon 
            reverse
            type="material-community"
            name="plus"
            color="#00a680"
            containerStyle={styles.btnContainer}
            onPress={goToAddRestaurant}
          />
        )}
    </View>
  )
}
