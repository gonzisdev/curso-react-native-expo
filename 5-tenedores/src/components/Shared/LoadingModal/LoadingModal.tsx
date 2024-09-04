import { View, ActivityIndicator } from 'react-native'
import { Overlay, Text } from '@rneui/base'
import { styles } from './LoadingModal.styles'

type LoadingModalProps = {
    show: boolean
    text?: string
}

export const LoadingModal = ({show, text}: LoadingModalProps) => {

  return (
    <Overlay isVisible={show} overlayStyle={styles.overlay}>
        <View style={styles.view}>
            <ActivityIndicator size="large" color="#00a680" />
            {text && <Text style={styles.text}>{text}</Text>}
        </View>
    </Overlay>
  )
}

LoadingModal.defaultProps = {
    show: false
}