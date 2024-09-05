import { useState } from 'react'
import { View } from 'react-native'
import { ListItem, Icon, Text } from '@rneui/base'
import { Modal } from '../Shared/Modal/Modal'
import { ChangeDisplayNameForm } from './ChangeDisplayNameForm/ChangeDisplayNameForm'
import { ChangeEmailForm } from './ChangeEmailForm/ChangeEmailForm'

type SelectedComponents = {
    displayName: string
    email: string
    password: string
}

type AccountOptionsProps = {
    onReload: () => void
}

export const AccountOptions = ({onReload}: AccountOptionsProps) => {

    const [showModal, setShowModal] = useState(false)
    const [renderCopmponent, setRenderComponent] = useState<JSX.Element | null>(null)

    const onCloseOpenModal = () => setShowModal(prevState => !prevState)
    

    const selectedComponent = (key: keyof SelectedComponents) => {
        if (key === "displayName") {
            setRenderComponent(<ChangeDisplayNameForm onClose={onCloseOpenModal} onReload={onReload} />)
        }
        if (key === "email") {
            setRenderComponent(<ChangeEmailForm onClose={onCloseOpenModal} onReload={onReload} />)
        }
        if (key === "password") {
            setRenderComponent(<Text>Cambiar contraseña</Text>)
        }
        onCloseOpenModal()
    }

    const menuOptions = getMenuOptions(selectedComponent)


  return (
    <View>
      {menuOptions.map((option, index) => (
        <ListItem key={index} bottomDivider onPress={option.onPress}>
            <Icon type={option.iconType} name={option.iconNameLeft} color={option.iconColorLeft} />
            <ListItem.Content>
                <ListItem.Title>{option.title}</ListItem.Title>
            </ListItem.Content>
            <Icon type={option.iconType} name={option.iconNameRight} color={option.iconColorRight} />
        </ListItem>
      ))}
      <Modal show={showModal} close={onCloseOpenModal}>
        {renderCopmponent}
      </Modal>
    </View>
  )
}

const getMenuOptions= (selectedComponent: (key: keyof SelectedComponents) => void) => {
    return [
        {
            title: "Cambiar nombre y apellidos",
            iconType: "material-community",
            iconNameLeft: "account-circle",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectedComponent("displayName")
        },
        {
            title: "Cambiar email",
            iconType: "material-community",
            iconNameLeft: "at",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectedComponent("email")
        },
        {
            title: "Cambiar contraseña",
            iconType: "material-community",
            iconNameLeft: "lock-reset",
            iconColorLeft: "#ccc",
            iconNameRight: "chevron-right",
            iconColorRight: "#ccc",
            onPress: () => selectedComponent("password")
        }
    ]
}