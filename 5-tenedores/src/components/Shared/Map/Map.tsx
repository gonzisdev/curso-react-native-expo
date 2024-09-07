import MapView, { Marker } from 'react-native-maps'
import openMap from "react-native-open-maps"
import { styles } from './Map.styles'

type MapProps = {
    location: {
        latitude: number
        longitude: number
        latitudeDelta: number
        longitudeDelta: number
    }
    name: string
}

export const Map = ({location, name}: MapProps) => {

    const openAppMap = () => {
        openMap({
           latitude: location.latitude,
           longitude: location.longitude,
           zoom: 19,
           query: name
        })
    }

  return (
    <MapView initialRegion={location} style={styles.content} onPress={openAppMap}>
        <Marker coordinate={location} />
    </MapView>
  )
}