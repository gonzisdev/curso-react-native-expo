import { Text } from 'react-native'
import { styles } from './MapForm.styles'
import { Modal } from '../../../Shared/Modal/Modal'

type MapFormProps = {
    show: boolean,
    close: () => void
}

export const MapForm = ({show, close}: MapFormProps) => {
  return (
    <Modal show={show} close={close}>
        <Text>Mapform</Text>
    </Modal>
  )
}