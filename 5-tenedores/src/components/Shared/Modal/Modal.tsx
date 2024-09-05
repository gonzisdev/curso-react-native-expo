import { Overlay } from '@rneui/base'
import { styles } from './Modal.styles'

type ModalProps = {
    show: boolean
    close: () => void
    children: React.ReactNode
}

export const Modal = ({show, close, children}: ModalProps) => {
  return (
    <Overlay isVisible={show} overlayStyle={styles.overlay} onBackdropPress={close}>
        {children}
    </Overlay>
  )
}