import MapView, { Marker } from 'react-native-maps'
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
  return (
    <MapView initialRegion={location} style={styles.content}>
        <Marker coordinate={location} />
    </MapView>
  )
}