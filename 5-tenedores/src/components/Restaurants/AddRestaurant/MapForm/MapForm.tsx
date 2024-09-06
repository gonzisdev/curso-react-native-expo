import { useEffect, useState } from 'react'
import { View } from 'react-native'
import { styles } from './MapForm.styles'
import * as Location from "expo-location"
import { Modal } from '../../../Shared/Modal/Modal'
import Toast from 'react-native-toast-message'
import MapView, { Marker } from 'react-native-maps'

type MapFormProps = {
    show: boolean,
    close: () => void
}

export const MapForm = ({show, close}: MapFormProps) => {

    const [location, setLocation] = useState({
        latitude: 0.001,
        longitude: 0.001,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001
    })

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== "granted") {
                Toast.show({
                    type: "info",
                    position: "bottom",
                    text1: "Tienes que ir a ajustes de la app y activar la localización"
                })
                return
            }
            const locationTemp = await Location.getCurrentPositionAsync({})
            setLocation({
                latitude: locationTemp.coords.latitude,
                longitude: locationTemp.coords.longitude,
                latitudeDelta: 0.001,
                longitudeDelta: 0.001
            })
        })()
    }, [])

  return (
    <Modal show={show} close={close}>
        <View>
            <MapView initialRegion={location} showsUserLocation={true} style={styles.mapStyle} onRegionChange={(locationTemp) => setLocation(locationTemp) }>
                <Marker coordinate={location} />
            </MapView>
        </View>
    </Modal>
  )
}