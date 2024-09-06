import { useEffect, useState } from 'react'
import { Text } from 'react-native'
import { styles } from './MapForm.styles'
import * as Location from "expo-location"
import { Modal } from '../../../Shared/Modal/Modal'
import Toast from 'react-native-toast-message'

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
        <Text>Mapform</Text>
    </Modal>
  )
}