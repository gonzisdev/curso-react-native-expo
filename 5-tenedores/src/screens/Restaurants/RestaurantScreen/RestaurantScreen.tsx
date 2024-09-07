import { useEffect, useState } from 'react'
import { ScrollView, Dimensions } from 'react-native'
import { doc, onSnapshot, collection, query, where, orderBy } from "firebase/firestore"
import { Carousel } from '../../../components/Shared/Carousel/Carousel'
import { Loading } from '../../../components/Shared/Loading/Loading'
import { styles } from './RestaurantScreen.styles'
import { db } from '../../../utils/firebase'


type RestaurantData = { // Mejor crear un tipo global, no de manera local en el componente
    id: string
    name: string
    address: string
    phone: string
    email: string
    description: string
    location: null
    images: never[]
    createdAt: Date
}

type RestaurantScreenProps = { // No hacer esto xD Tipar correctamente
    route: {
        params: {
            id: string
        }
    }
}

const { width } = Dimensions.get("window")
  
export const RestaurantScreen = ({route}: RestaurantScreenProps) => {
    
    const [restaurant, setRestaurant] = useState<RestaurantData | null | undefined>(null) // No hacer esto

    useEffect(() => {
        setRestaurant(null)
        onSnapshot(doc(db, "restaurants", route.params.id), (doc) => {
            setRestaurant(doc.data() as RestaurantData)
        })
    }, [route.params.id])
    
    if (!restaurant) return <Loading show text="Cargando restaurantes" />

  return (
    <ScrollView style={styles.content}>
      <Carousel arrayImages={restaurant.images} width={width} height={250} />
    </ScrollView>
  )
}