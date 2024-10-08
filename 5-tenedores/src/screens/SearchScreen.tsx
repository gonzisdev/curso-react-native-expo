import { useState, useEffect } from 'react'
import { View, ScrollView } from 'react-native'
import { SearchBar, ListItem, Avatar, Icon } from '@rneui/base'
import { Loading } from '../components/Shared/Loading/Loading'
import { query, collection, startAt, endAt, limit, orderBy, getDocs, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore'
import { db } from '../utils/firebase'
import { useNavigation } from '@react-navigation/native'
import { screen } from '../utils/screenName'

export const SearchScreen = () => {

  const [searchText, setSearchText] = useState("")
  const [searchResults, setSearchResults] = useState<QueryDocumentSnapshot<DocumentData, DocumentData>[] | null>(null)

  const navigation = useNavigation()

  useEffect(() => {
    (async () => {
      const q = query(
        collection(db, "restaurants"),
        orderBy("name"),
        startAt(searchText),
        endAt(`${searchText}\uf8ff`),
        limit(20)
      )
      const querySnapshot = await getDocs(q)
      setSearchResults(querySnapshot.docs)
    })()
  }, [searchText])

  const goToRestaurant = (idRestaurant: string) => {
    navigation.navigate(screen.restaurant.tab, {
      screen: screen.restaurant.restaurant,
      params: {
        id: idRestaurant
      }
    })
  }

  return (
    <>
      <SearchBar 
        placeholder='Busca tu restaurante'
        value={searchText}
        onChangeText={(text) => setSearchText(text)}
      />
      {!searchResults && <Loading show text='Cargando' />}
      <ScrollView>
        {searchResults?.length === 0 ? (
          <View style={{alignItems: "center", marginTop: 20}}>
            <Text>No se han encontrado resultados</Text>
          </View>
        ) : (
          searchResults?.map(item => {
            const data = item.data()
            return (
              <ListItem key={data.id} bottomDivider onPress={() => goToRestaurant(data.id)}>
                <Avatar source={{uri: data.images[0]}} rounded />
                <ListItem.Content>
                  <ListItem.Title>{data.name}</ListItem.Title>
                </ListItem.Content>
                <Icon type='material-community' name='chevron-right' />
              </ListItem>
            )
          })
        )}
      </ScrollView>
    </>
  )
}
