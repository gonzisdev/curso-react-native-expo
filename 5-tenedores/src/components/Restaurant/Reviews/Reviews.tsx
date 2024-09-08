import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { Text, AirbnbRating, ListItem, Avatar } from '@rneui/base'
import { onSnapshot, collection, query, where, orderBy, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'
import { Loading } from '../../Shared/Loading/Loading'
import { db } from '../../../utils/firebase'
import { styles } from './Reviews.styles'

type ReviewsProps = {
    idRestaurant: string // Mejor crear tipo de Restaurant de manera global y hacer look up
}

export default function Reviews({idRestaurant}: ReviewsProps) {

    const formatDate = (isoString : string) : string => {
        const date = new Date(isoString)
        const formatter = new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        })
        return formatter.format(date)
    }

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

    if (!reviews) return <Loading show text='Cargando' />

  return (
    <View style={styles.content}>
      {reviews.map(review => {
        const createReview = new Date(review.data().createdAt.seconds * 1000)
        return (
        <ListItem key={review.data().id} bottomDivider containerStyle={styles.review}>
            <Avatar source={{uri: review.data().avatar}} size={50} rounded />
            <ListItem.Content>
                <ListItem.Title style={styles.title}>
                    {review.data().title}
                </ListItem.Title>
                <View style={styles.subtitle}>
                    <Text style={styles.comment}>{review.data().comment}</Text>
                    <View style={styles.contentRatingDate}>
                        <AirbnbRating defaultRating={review.data().rating} showRating={false} size={15} isDisabled starContainerStyle={styles.starContainer} />
                        <Text style={styles.date}>{formatDate(createReview.toString())}</Text>
                    </View>
                </View>
            </ListItem.Content>
        </ListItem>
      )})}
    </View>
  )
}