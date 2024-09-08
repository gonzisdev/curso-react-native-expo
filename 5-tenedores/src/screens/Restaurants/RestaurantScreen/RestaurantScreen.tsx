import { useEffect, useState } from 'react'
import { ScrollView, Dimensions } from 'react-native'
import { doc, onSnapshot } from "firebase/firestore"
import { Carousel } from '../../../components/Shared/Carousel/Carousel'
import { Loading } from '../../../components/Shared/Loading/Loading'
import { styles } from './RestaurantScreen.styles'
import { db } from '../../../utils/firebase'
import { Header } from '../../../components/Restaurant/Header/Header'
import { Info } from '../../../components/Restaurant/Info/Info'
import { BtnReviewForm } from '../../../components/Restaurant/BtnReviewForm/BtnReviewForm'
import Reviews from '../../../components/Restaurant/Reviews/Reviews'
import { BtnFavorite } from '../../../components/Restaurant/BtnFavorite/BtnFavorite'

type RestaurantData = { // Mejor crear un tipo global, no de manera local en el componente
    id: string
    name: string
    address: string
    phone: string
    email: string
    description: string
    location: {
        latitude: number
        longitude: number
        latitudeDelta: number
        longitudeDelta: number
    }
    images: never[]
    createdAt: Date
    ratingMedia: number
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
      <Header restaurant={restaurant} />
      <Info restaurant={restaurant} />
      <BtnReviewForm idRestaurant={route.params.id} />
      <Reviews idRestaurant={route.params.id} />
      <BtnFavorite idRestaurant={route.params.id} />
    </ScrollView>
  )
}